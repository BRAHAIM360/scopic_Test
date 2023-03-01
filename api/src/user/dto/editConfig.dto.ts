import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class EditConfigDto {
  @ApiProperty({
    type: Number,
    description: "bid amount for auto biding",
    required: false,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  bid_amount: number;

  @ApiProperty({
    type: Number,
    description: "max bit for auto biding",
    required: false,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  max_bid: number;

  @ApiProperty({
    type: Number,
    description: "bid alert proucentage",
    required: false,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  bid_alert: number;
}
