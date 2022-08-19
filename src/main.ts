import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  //swagger
  const app: INestApplication = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('bkp-crud-api')
    .setDescription('Uma api para controle dos planos de backup da Altatech')
    .setVersion('0.1')
    .addTag('backup')
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //prisma
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(port);
  // console.log('http://localhost:' + port);
}
bootstrap();
