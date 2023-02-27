import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AutobiddingDto, CreateBidDto } from "./dto";

@Injectable()
export class BidService {
  constructor(private prisma: PrismaService) {}

  async createBid(userId: number, itemId: number, dto: CreateBidDto, isBot: boolean = false) {
    const item = await this.prisma.item.findUnique({
      where: {
        id: itemId,
      },
    });
    if (!item) throw new BadRequestException("Item not found");
    if (item.current_bid > dto.amount)
      throw new BadRequestException("Price is lower than current bid");
    if (item.current_bid == dto.amount)
      throw new BadRequestException("Price is equal to current bid price");

    const bid = await this.prisma.bid.create({
      data: {
        bid_price: dto.amount,
        autoBid: isBot,
        item: {
          connect: {
            id: itemId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    await this.prisma.item.update({
      where: { id: itemId },
      data: { current_bid: dto.amount },
    });

    //start auto bidding bot
    this.autoBiddingBot(itemId);

    return bid;
  }

  async autoBiddingEnabler(userId: number, itemId: number, dto: AutobiddingDto) {
    if (dto.state) {
      const item = await this.prisma.item.update({
        where: { id: itemId },
        data: { autoBidingUsers: { connect: { id: userId } } },
      });
      this.autoBiddingBot(itemId);
      return item;
    } else {
      await this.prisma.item.update({
        where: { id: itemId },
        data: { autoBidingUsers: { disconnect: { id: userId } } },
      });
    }
  }

  //this is the function  will handle the auto bidding bot and notification it will be called each time a new bid is created
  async autoBiddingBot(itemId: number) {
    //get the item
    let item = await this.prisma.item.findUnique({
      where: { id: itemId },
      include: {
        autoBidingUsers: true,
        bid: { orderBy: { createdAt: "desc" } },
      },
    });

    //if we have no user in autobidding list
    if (item.autoBidingUsers.length == 0) return;

    //if we have only one user in autobidding list
    if (item.autoBidingUsers.length == 1) {
      const [user] = item.autoBidingUsers;
      const [lastBid] = item.bid;

      //if last bid is from this user to prevent infinite loop
      if (lastBid?.user_id == user.id) return;

      //if the remaining amount is less than the current bid we send notification to the user and return
      if (user.max_bid - user.bid_amount < item.current_bid + 1) {
        this.prisma.notification.create({
          data: {
            user: {
              connect: { id: user.id },
            },
            message: `You dont have enough amount to bid for ${item.name}%`,
          },
        });
        return;
      }

      //if last bid is from other user

      //if last bid is from the bot so we need to return the amount to the user
      if (lastBid.autoBid)
        await this.prisma.user.update({
          where: { id: lastBid.user_id },
          data: { bid_amount: { decrement: lastBid.bid_price } },
        });

      //create new bid and update the user bid amount
      const [_, updatedUser] = await Promise.all([
        this.createBid(user.id, itemId, { amount: item.current_bid + 1 }, true),
        this.prisma.user.update({
          where: { id: lastBid.user_id },
          data: { bid_amount: { increment: lastBid.bid_price } },
        }),
      ]);

      //send notification to the user if he reach bid alert
      const pourcentage = (updatedUser.bid_amount / updatedUser.max_bid) * 100;
      if (pourcentage >= updatedUser.bid_alert)
        this.prisma.notification.create({
          data: {
            user: {
              connect: { id: updatedUser.id },
            },
            message: `You have reached ${pourcentage}% of your bid alert`,
          },
        });
    }

    //if we have more than one user in autobidding list
    if (item.autoBidingUsers.length > 1) {
      //first we return the last bid if it was from the bot
      const [lastBid] = item.bid;
      if (lastBid.autoBid)
        await this.prisma.user.update({
          where: { id: lastBid.user_id },
          data: { bid_amount: { decrement: lastBid.bid_price } },
        });

      //we update items variable to get the updated users
      item = await this.prisma.item.findUnique({
        where: { id: itemId },
        include: {
          autoBidingUsers: true,
          bid: true,
        },
      });

      //we sort the users in descending order by the remaining amount
      item.autoBidingUsers.sort((a, b) => b.max_bid - b.bid_amount - (a.max_bid - a.bid_amount));

      //we get the first two users who have the highest bid amount remaining
      let [user1, user2] = item.autoBidingUsers;

      //the user with the highest bid amount remaining will be the user who will bid with the maximum amount + 1 of the second user
      //for example if the first user has 100$ remaining and the second user has 50$ remaining
      //the first user will bid with 51$, this will optimize the bidding process and make it more efficient

      const amount = user2.max_bid - user2.bid_amount + 1;

      //create new bid and update the user bid amount
      const [_, updatedUser] = await Promise.all([
        this.createBid(user1.id, itemId, { amount }, true),
        this.prisma.user.update({
          where: { id: lastBid.user_id },
          data: { bid_amount: { increment: amount } },
        }),
      ]);

      //send notification to the user if he reach bid alert
      const pourcentage = (updatedUser.bid_amount / updatedUser.max_bid) * 100;
      if (pourcentage >= updatedUser.bid_alert)
        this.prisma.notification.create({
          data: {
            user: {
              connect: { id: updatedUser.id },
            },
            message: `You have reached ${pourcentage}% of your bid alert`,
          },
        });
    }
  }
}
