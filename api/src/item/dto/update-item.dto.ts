import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateItemDto {
  @ApiProperty({
    type: String,
    description: "Name of the item",
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty({
    type: String,
    description: "Description of the item",
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @ApiProperty({
    type: String,
    description: "Image of the item",
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  image: string;

  @ApiProperty({
    type: Number,
    description: "start price of the item",
    required: false,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  start_price: number;
}
