import { ConfigService } from "@nestjs/config";
import { PrismaService } from "./../prisma/prisma.service";
import * as argon from "argon2";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { Tokens } from "./types";
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signin(dto: AuthDto): Promise<Tokens> {
    try {
      //find the user by username
      const user = await this.prisma.user.findUnique({
        where: {
          username: dto.username,
        },
      });
      //if user does not exist throw excepetion
      if (!user) throw "Credential not correct";

      //compare password
      const pwMatches = await argon.verify(user.password, dto.password);
      //if password incorect throw exeption
      if (!pwMatches) throw "Credential not correct";

      const tokens = await this.getTotken(user.id, user.username);
      return tokens;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException(error);
    }
  }

  async me(userid: number) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: userid,
        },
      });
      delete user.password;
      return user;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException(error);
    }
  }

  async getTotken(userId: number, username: string): Promise<Tokens> {
    const jwtPayload = {
      sub: userId,
      username,
    };
    const access_token = await this.jwt.signAsync(jwtPayload, {
      secret: this.config.get("SECRET"),
      // expiresIn: "3h",
    });

    return {
      access_token,
    };
  }
}
