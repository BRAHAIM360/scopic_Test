import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { QueryPage } from "src/common/page/query-args.dto";

export class QueryItemDto extends QueryPage {
  @ApiProperty({
    type: String,
    description: "search item",
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  search: string;

  @ApiProperty({
    type: String,
    description: "sort item by",
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  sort_by: string;

  @ApiProperty({
    type: String,
    description: "order of the sorting asc/desc",
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  order: string;
}
