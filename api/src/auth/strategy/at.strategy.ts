import { PrismaService } from "./../../prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class Atstrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get("AT_SECRET"),
    });
  }
  async validate(payload: { sub: number; email: string }) {
    return payload;
  }
}
