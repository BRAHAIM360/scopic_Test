import { BadRequestException, ForbiddenException, Injectable, Param, Patch } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse } from "@nestjs/swagger";
import { GetIsAdmin } from "src/common/decorator/isAdmin-decorator";
import { PrismaService } from "src/prisma/prisma.service";
import { EditConfigDto } from "./dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editConfig(userId: number, dto: EditConfigDto) {
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: { ...dto },
      });
      return { message: "user updated" };
    } catch (error) {
      throw new BadRequestException();
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

  async getNotification(userid: number) {
    try {
      const notifcations = await this.prisma.notification.findMany({
        where: {
          user_id: userid,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return notifcations;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
