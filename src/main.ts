import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestApplication, NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { Logger as LoggerService } from 'nestjs-pino';
import { AppModule } from './app.module';
import type { Config } from './config';
import { Default } from './config';

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  const loggerService = app.get(LoggerService);

  const NODE_ENV = configService.get<Config['NODE_ENV']>(
    'NODE_ENV',
    Default.NODE_ENV,
  );

  const PORT = configService.get<Config['PORT']>('PORT', Default.PORT);

  await app.listen(PORT);

  const url = await app.getUrl();

  Logger.log(
    `Nest application running in ${NODE_ENV} environment`,
    NestApplication.name,
  );

  Logger.log(`Nest application listening at ${url}`, NestApplication.name);

  app.useLogger(loggerService);
};

bootstrap();
