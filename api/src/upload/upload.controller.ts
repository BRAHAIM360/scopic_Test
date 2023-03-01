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
  Res,
  UploadedFile,
} from "@nestjs/common";
import { UploadService } from "./upload.service";
import { Public } from "src/common/decorator";
import { ApiCreatedResponse, ApiNotFoundResponse, ApiTags } from "@nestjs/swagger";
import { ApiFile } from "src/common/decorator/api-file.decorator";
import { ParseFile } from "src/common/decorator/parse-file.pipe";
import { Response } from "express";

@ApiTags("upload")
@Controller("upload")
@Public()
export class AppController {
  constructor(private readonly UploadService: UploadService) {}

  @Post()
  @ApiCreatedResponse({ description: "The resource has been successfully created" })
  @ApiNotFoundResponse({ description: "Bad Request" })
  @ApiFile("image", true)
  uploadImage(@UploadedFile(ParseFile) image: Express.Multer.File) {
    return this.UploadService.uploadImage(image);
  }

  @Get(":filename")
  @ApiCreatedResponse({ description: "The resource has been successfully returned" })
  @ApiNotFoundResponse({ description: "Bad Request" })
  async serveFile(@Param("filename") filename: string, @Res() res: Response) {
    return this.UploadService.serveFile(filename, res);
  }
}
