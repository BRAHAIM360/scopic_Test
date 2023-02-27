import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBidDto {
  @ApiProperty({
    type: Number,
    description: "Amount of the bid",
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  amount: number;
}
