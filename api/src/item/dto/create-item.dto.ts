import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateItemDto {
  @ApiProperty({
    type: String,
    description: "Name of the item",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: "Description of the item",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: String,
    description: "Image of the item",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    type: Number,
    description: "start price of the item",
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  start_price: number;

  @ApiProperty({
    type: Date,
    description: "starting date",
    required: true,
  })
  @Type(() => Date)
  @IsNotEmpty()
  starting_Date: Date;

  @ApiProperty({
    type: Date,
    description: "date end of the auction",
    required: true,
  })
  @IsNotEmpty()
  @Type(() => Date)
  ending_Date: Date;
}
