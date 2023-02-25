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
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import { ApiFile } from "src/common/decorator/api-file.decorator";
import { ParseFile } from "src/common/decorator/parse-file.pipe";
import { UpdateItemDto } from "./dto";
import { ItemService } from "./item.service";
import { QueryItemDto } from "./dto/query-item.dto";
import { Public } from "src/common/decorator";

@Controller("items")
@Public()
export class AppController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @ApiCreatedResponse({ description: "The resource has been successfully created" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  createItem(@Body() dto: CreateItemDto) {
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
  editItemById(@Param("id", ParseIntPipe) ItemId: number, @Body() dto: UpdateItemDto) {
    return this.itemService.editItemById(ItemId, dto);
  }

  @Delete(":id")
  @ApiOkResponse({ description: "The resource has been successfully deleted" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  deleteItemById(@Param("id", ParseIntPipe) ItemId: number) {
    return this.itemService.deleteItemById(ItemId);
  }

  @Post("upload")
  @ApiCreatedResponse({ description: "The resource has been successfully created" })
  @ApiNotFoundResponse({ description: "Bad Request" })
  @ApiFile("image", true)
  uploadImage(@UploadedFile(ParseFile) image: Express.Multer.File) {
    return this.itemService.uploadImage(image);
  }
}
