import { UpdateItemDto } from "./dto/update-item.dto";
import { QueryItemDto } from "./dto/query-item.dto";
import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBidDto, CreateItemDto } from "./dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  uploadImage(image: Express.Multer.File) {
    const link = `/uploads/${image.filename}`;
    return { image: link };
  }

  async createBid(userId: number, itemId: number, dto: CreateBidDto) {
    const item = await this.prisma.item.findUnique({
      where: {
        id: itemId,
      },
    });
    if (!item) throw new BadRequestException("Item not found");
    if (item.start_price > dto.amount) throw new BadRequestException("Price is too low");

    const bid = await this.prisma.bid.create({
      data: {
        bid_price: dto.amount,
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
    return bid;
  }

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
      [sort_by]: order,
    };
    const [items, recordsTotal] = await Promise.all([
      this.prisma.item.findMany({ where, orderBy, skip, take }),
      this.prisma.item.count({ where }),
    ]);
    const pageinfo = {
      page: page | 0,
      pages: Math.ceil(recordsTotal / take),
      recordsDisplay: items.length,
      recordsTotal,
    };

    return { items, pageinfo };
  }

  async getItem(itemId: number) {
    const items = await this.prisma.item.findUnique({
      where: {
        id: itemId,
      },
    });
    return items;
  }

  async editItemById(itemId: number, data: UpdateItemDto) {
    const item = await this.prisma.item.update({
      where: {
        id: itemId,
      },
      data,
    });
    return item;
  }

  async deleteItemById(itemId: number) {
    const item = await this.prisma.item.delete({
      where: {
        id: itemId,
      },
    });
    return item;
  }
}
