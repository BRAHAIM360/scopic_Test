import { ConfigService } from "@nestjs/config";
import { PrismaService } from "./../prisma/prisma.service";
import * as argon from "argon2";
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
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
      if (!user) throw new ForbiddenException("Credential not correct");

      //compare password
      const pwMatches = await argon.verify(user.password, dto.password);
      //if password incorect throw exeption
      if (!pwMatches) throw new ForbiddenException("Credential not correct");

      //send back the user
      //delete user.hash;
      const tokens = await this.getTotken(user.id, user.username);
      return tokens;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException(error);
    }
  }

  async me(userid: number) {
    try {
      //find the user by username
      const user = await this.prisma.user.findFirst({
        where: {
          id: userid,
        },
      });
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
      secret: this.config.get<string>("AT_SECRET"),
      // expiresIn: "3h",
    });

    return {
      access_token,
    };
  }
}
