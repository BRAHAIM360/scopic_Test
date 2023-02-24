import { AuthController } from "./auth.controller";
import { Module } from "@nestjs/common";
import { Atstrategy, JwtStrategy } from "./strategy";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, Atstrategy],
})
export class AuthModule {}
