import { BidModule } from "./bid/bid.module";
import { UserModule } from "./user/user.module";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";
import { JwtModule } from "@nestjs/jwt";
import { ItemModule } from "./item/item.module";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { AtGuard } from "./common/guard";
import * as express from "express";
import { UploadModule } from "./upload/upload.module";
@Module({
  imports: [
    JwtModule.register({}),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    MulterModule.register({ dest: "./uploads" }),
    PrismaModule,
    ItemModule,
    AuthModule,
    UploadModule,
    UserModule,
    BidModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AtGuard }],
})
export class AppModule {
  configure(consumer: any) {
    // Create an instance of the express application
    const app = express();

    // Serve files in the public folder
    app.use(express.static("uploads"));

    // Mount the express application
    consumer.apply(app).forRoutes("*");
  }
}
