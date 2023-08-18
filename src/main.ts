import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  
  const config = new DocumentBuilder()
    .setTitle('Crud Example')
    .setDescription('This api registers candidates and companies where companies can register their vacancies and candidates can register for vacancies')
    .setVersion('1.0')
    .addTag('teste')
    .build();

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)

  await app.listen(3000);
}
bootstrap();
