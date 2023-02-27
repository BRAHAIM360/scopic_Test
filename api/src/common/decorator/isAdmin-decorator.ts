import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const GetIsAdmin = createParamDecorator(
  (data: undefined, context: ExecutionContext): boolean => {
    const request: Request | any = context.switchToHttp().getRequest();
    return request.user["isAdmin"];
  },
);
