import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class QueryPage {
  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  take: number = 10;

  @ApiProperty({ required: false, default: 0 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  page: number = 1;
}
