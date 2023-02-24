import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
  @ApiProperty({
    type: String,
    description: "Username",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: String,
    description: "password",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
