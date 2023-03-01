import { AutobiddingDto } from "../bid/dto/autobidding.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { QueryItemDto } from "./dto/query-item.dto";
import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateItemDto, DeleteItemsDto } from "./dto";

import { Prisma } from "@prisma/client";

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async createItem(data: CreateItemDto) {
    const item = await this.prisma.item.create({
      data: { ...data, current_bid: data.start_price },
    });
    return item;
  }

  async getItems(query: QueryItemDto) {
    let { take, page, search, order, sort_by } = query;
    take = take || 10;
    page = page || 1;
    if (page && page <= 0) throw new BadRequestException("Page shold not be negative or zero ");

    const skip = page && take ? take * (page - 1) : undefined;

    const where: Prisma.ItemWhereInput = search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : {};
    const orderBy: Prisma.ItemOrderByWithAggregationInput = {
      [sort_by || "id"]: order || "asc",
    };
    const [items, recordsTotal]: any = await Promise.all([
      this.prisma.item.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          bid: {
            orderBy: { createdAt: "desc" },
            include: { user: { select: { username: true } } },
          },
        },
      }),
      this.prisma.item.count({ where }),
    ]);
    items.forEach(item => {
      item.usernameLastBid = item.bid.length > 0 ? item.bid[0]?.user?.username : null;
      delete item.bid;
    });

    const pageinfo = {
      page: page | 0,
      pages: Math.ceil(recordsTotal / take),
      recordsDisplay: items.length,
      recordsTotal,
    };

    return { items, pageinfo };
  }
  //
  async getItem(itemId: number) {
    const item: any = await this.prisma.item.findUnique({
      where: {
        id: itemId,
      },
      include: {
        bid: {
          orderBy: { createdAt: "desc" },
          include: { user: { select: { username: true } } },
        },
      },
    });
    if (!item) throw new BadRequestException("Item not found");
    if (item.bid.length > 0) {
      item.usernameLastBid = item.bid[0].user.username;
    }
    delete item.bid;
    return item;
  }

  async editItemById(itemId: number, data: UpdateItemDto) {
    try {
      await this.prisma.item.update({
        where: {
          id: itemId,
        },
        data,
      });
      return { message: "Item updated" };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteItemById(itemId: number) {
    try {
      await this.prisma.item.delete({
        where: {
          id: itemId,
        },
      });
      return { message: "Item deleted" };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteItems(dto: DeleteItemsDto) {
    try {
      await this.prisma.item.deleteMany({
        where: {
          id: {
            in: dto.items,
          },
        },
      });
      return { message: "Items deleted" };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
