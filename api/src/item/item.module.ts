import { Module } from "@nestjs/common";
import { AppController } from "./item.controller";
import { ItemService } from "./item.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ItemService],
})
export class ItemModule {}
