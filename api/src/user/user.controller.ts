import { GetUserId } from "src/common/decorator";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { Body, Controller, Get, HttpCode, HttpStatus, Patch } from "@nestjs/common";
import { UserService } from "./user.service";
import { EditConfigDto } from "./dto";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch("config")
  @ApiOkResponse({ description: "The resource has been successfully updated" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  editConfig(@GetUserId() userId: number, @Body() dto: EditConfigDto) {
    return this.userService.editConfig(userId, dto);
  }

  @ApiCreatedResponse({ description: "The resource has been successfully returned" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  @HttpCode(HttpStatus.OK)
  @Get("me")
  me(@GetUserId() userId: number) {
    return this.userService.me(userId);
  }

  @ApiCreatedResponse({ description: "The resource has been successfully returned" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  @HttpCode(HttpStatus.OK)
  @Get("notifications")
  getNotification(@GetUserId() userId: number) {
    return this.userService.getNotification(userId);
  }
}
