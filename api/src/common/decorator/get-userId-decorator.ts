import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const GetUserId = createParamDecorator(
  (data: undefined, context: ExecutionContext): number => {
    const request: Request | any = context.switchToHttp().getRequest();
    return request.user["sub"];
  },
);
