import { CreateItemDto } from "./dto/create-item.dto";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  Res,
  ForbiddenException,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Response } from "express";

import { ApiFile } from "src/common/decorator/api-file.decorator";
import { ParseFile } from "src/common/decorator/parse-file.pipe";
import { UpdateItemDto } from "./dto";
import { ItemService } from "./item.service";
import { QueryItemDto } from "./dto/query-item.dto";
import { GetUserId, Public } from "src/common/decorator";
import { GetIsAdmin } from "src/common/decorator/isAdmin-decorator";

@ApiTags("items")
@Controller("items")
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @ApiCreatedResponse({ description: "The resource has been successfully created" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  createItem(@GetIsAdmin() isAdmin: boolean, @Body() dto: CreateItemDto) {
    if (!isAdmin) throw new ForbiddenException("action not allowed");
    return this.itemService.createItem(dto);
  }

  @Get()
  @ApiOkResponse({ description: "The resource has been successfully returned" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  getItems(@Query() query: QueryItemDto) {
    return this.itemService.getItems(query);
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
  editItemById(
    @GetIsAdmin() isAdmin: boolean,
    @Param("id", ParseIntPipe) ItemId: number,
    @Body() dto: UpdateItemDto,
  ) {
    if (!isAdmin) throw new ForbiddenException("Action not allowed");
    return this.itemService.editItemById(ItemId, dto);
  }

  @Delete(":id")
  @ApiOkResponse({ description: "The resource has been successfully deleted" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  deleteItemById(@GetIsAdmin() isAdmin: boolean, @Param("id", ParseIntPipe) ItemId: number) {
    if (!isAdmin) throw new ForbiddenException("Action not allowed");
    return this.itemService.deleteItemById(ItemId);
  }
}
