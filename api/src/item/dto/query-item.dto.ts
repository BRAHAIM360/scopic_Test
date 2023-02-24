import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { QueryPage } from "src/common/page/query-args.dto";

export class QueryItemDto extends QueryPage {
  @ApiProperty({
    type: String,
    description: "Name of the item",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: "Description of the item",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: String,
    description: "sort item by",
  })
  @IsString()
  @IsNotEmpty()
  sort_by: string;

  @ApiProperty({
    type: String,
    description: "order of the sorting ASC/DESC",
  })
  @IsString()
  @IsNotEmpty()
  order: string;
}
