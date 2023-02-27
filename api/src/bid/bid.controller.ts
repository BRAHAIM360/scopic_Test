import { Body, Controller, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { GetUserId } from "src/common/decorator";
import { BidService } from "./bid.service";
import { AutobiddingDto, CreateBidDto } from "./dto";

@ApiTags("bid")
@Controller("bid")
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @Post(":id")
  @ApiCreatedResponse({ description: "The resource has been successfully created" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  createBid(
    @GetUserId() userId: number,
    @Body() dto: CreateBidDto,
    @Param("id", ParseIntPipe) itemId: number,
  ) {
    return this.bidService.createBid(userId, itemId, dto);
  }

  @Patch("autobidding/:id")
  @ApiCreatedResponse({ description: "The resource has been successfully updated" })
  @ApiBadRequestResponse({ description: "Bad Request" })
  autoBiddingEnabler(
    @GetUserId() userId: number,
    @Body() dto: AutobiddingDto,
    @Param("id", ParseIntPipe) itemId: number,
  ) {
    return this.bidService.autoBiddingEnabler(userId, itemId, dto);
  }
}
