import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";
import { JwtModule } from "@nestjs/jwt";
import { ItemModule } from "./item/item.module";

@Module({
  imports: [
    JwtModule.register({}),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    MulterModule.register({ dest: "./uploads" }),
    PrismaModule,
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
