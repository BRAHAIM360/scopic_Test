import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { Module } from "@nestjs/common";
import { Atstrategy, JwtStrategy } from "./strategy";

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, Atstrategy],
})
export class AuthModule {}
