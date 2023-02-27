import { Controller, Get } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";
@ApiTags("root")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ description: "Return Hello The Api online " })
  @ApiBadRequestResponse({ description: "Bad Request" })
  getHello() {
    return this.appService.getHello();
  }
}
