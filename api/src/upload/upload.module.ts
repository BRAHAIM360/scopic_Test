import { Module } from "@nestjs/common";
import { AppController } from "./upload.controller";
import { UploadService } from "./upload.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [UploadService],
})
export class UploadModule {}
