import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Computer Science Tutor')
  .setDescription('This is a web application system that is designed to help students get right directions of their dream goals in computer scince.')
  .setVersion('1.0')
  .addTag('blog')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(8080);
}
bootstrap();
