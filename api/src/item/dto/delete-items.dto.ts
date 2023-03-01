import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DeleteItemsDto {
  @ApiProperty({
    type: Array,
    description: "items id to delete",
    required: true,
  })
  @IsArray()
  items: number[];
}
