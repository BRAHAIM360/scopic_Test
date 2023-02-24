import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { UpdateItemDto } from "./dto";
import { ItemService } from "./item.service";

@Controller("items")
export class AppController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  @ApiOkResponse({ description: "The resource has been successfully returned" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  getItems() {
    return this.itemService.getItems();
  }

  @Get(":id")
  @ApiOkResponse({ description: "The resource has been successfully returned" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  async getItem(@Param("id", ParseIntPipe) itemId: number) {
    return this.itemService.getItem(itemId);
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "The resource has been successfully updated" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  editItemById(@Param("id", ParseIntPipe) ItemId: number, @Body() dto: UpdateItemDto) {
    return this.itemService.editItemById(ItemId, dto);
  }

  @Delete(":id")
  @ApiOkResponse({ description: "The resource has been successfully deleted" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  deleteItemById(@Param("id", ParseIntPipe) ItemId: number) {
    return this.itemService.deleteItemById(ItemId);
  }
}
