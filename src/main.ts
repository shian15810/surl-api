import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  await app.listen(3000);
};

bootstrap();
