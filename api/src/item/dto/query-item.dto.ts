import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { QueryPage } from "src/common/page/query-args.dto";

export class QueryItemDto extends QueryPage {
  @ApiProperty({
    type: String,
    description: "search item",
    required: false,
  })
  @IsString()
  @IsOptional()
  search: string;

  @ApiProperty({
    type: String,
    description: "sort item by",
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  sort_by: string;

  @ApiProperty({
    type: String,
    description: "order of the sorting asc/desc",
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  order: string;
}
