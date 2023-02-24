import { diskStorage } from "multer";
import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { v4 as uuidv4 } from "uuid";

export function ApiFile(
  fieldName: string = "file",
  required: boolean = false,
  localOptions: MulterOptions = {
    storage: diskStorage({
      destination: "./uploads",
      filename: (req, file, callback) => {
        const arr = file.originalname.split(".");
        const exten = arr.pop();
        arr.push(uuidv4() + ".");
        arr.push(exten);
        const filename: string = arr.join("");

        callback(null, filename);
      },
    }),
  },
) {
  return applyDecorators(
    UseInterceptors(FileInterceptor(fieldName, localOptions)),
    ApiConsumes("multipart/form-data"),
    ApiBody({
      schema: {
        type: "object",
        required: required ? [fieldName] : [],
        properties: {
          [fieldName]: {
            type: "string",
            format: "binary",
          },
        },
      },
    }),
  );
}
