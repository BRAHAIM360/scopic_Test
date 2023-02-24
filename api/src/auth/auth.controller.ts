import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Req,
  Post,
  UseGuards,
  Patch,
} from "@nestjs/common";
import { AuthDto } from "./dto";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";

import { GetUserId, Public } from "../common/decorator";
import { Tokens } from "./types";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Public()
  @ApiCreatedResponse({ description: "The resource has been successfully returned" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  signin(@Body() dto: AuthDto): Promise<Tokens> {
    return this.AuthService.signin(dto);
  }

  @ApiCreatedResponse({ description: "The resource has been successfully returned" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  @HttpCode(HttpStatus.OK)
  @Get("me")
  me(@GetUserId() userId: number) {
    return this.AuthService.me(userId);
  }
}
