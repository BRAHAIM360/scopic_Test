import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //swagger config
  const SwaggerConfig = new DocumentBuilder()
    .setTitle("SCOPIC API")
    .setDescription("SCOPIC CRUD API")
    .setVersion("1.0")
    .addTag("SCOPIC API")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "JWT",
    )
    .build();
  const document = SwaggerModule.createDocument(app, SwaggerConfig);
  SwaggerModule.setup("swagger", app, document);

  await app.listen(3333);
}
bootstrap();
