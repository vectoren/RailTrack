import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Allow Angular to talk to NestJS
  app.enableCors({
    origin: 'http://localhost:4200', 
  });

  await app.listen(3000);
}
bootstrap();