import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBidDto {
  @ApiProperty({
    type: Number,
    description: "Amount of the bid",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  amount: number;
}
