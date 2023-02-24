import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateItemDto } from "./dto";

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  uploadImage(file: Express.Multer.File) {
    const link = `/uploads/${file.filename}`;
    return link;
  }

  async createItem(data: CreateItemDto) {
    const item = await this.prisma.item.create({
      data,
    });
    return item;
  }

  async getItems() {
    const items = await this.prisma.item.findMany({});
    return items;
  }

  async getItem(itemId: number) {
    const items = await this.prisma.item.findUnique({
      where: {
        id: itemId,
      },
    });
    return items;
  }

  async editItemById(itemId: number, data: CreateItemDto) {
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
