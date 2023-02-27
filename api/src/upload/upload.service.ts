import { BadRequestException, Injectable } from "@nestjs/common";
import { Response } from "express";
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class UploadService {
  constructor() {}

  uploadImage(image: Express.Multer.File) {
    const link = `/upload/${image.filename}`;
    return { image: link };
  }

  async serveFile(filename: string, res: Response) {
    const filePath = path.resolve(`uploads/${filename}`);
    const exists = await fs.promises
      .access(filePath)
      .then(() => true)
      .catch(() => false);

    if (exists) {
      return res.sendFile(filePath);
    } else {
      throw new BadRequestException("File not found");
    }
  }
}
