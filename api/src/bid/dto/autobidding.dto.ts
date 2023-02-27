import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AutobiddingDto {
  @ApiProperty({
    type: Boolean,
    description: "enbale or disable autobidding",
    required: true,
  })
  @IsBoolean()
  state: boolean;
}
