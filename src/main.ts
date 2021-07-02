import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestApplication, NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import type { Config } from './config';
import { Default } from './config';

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  const nodeEnv = configService.get<Config['NODE_ENV']>(
    'NODE_ENV',
    Default.NODE_ENV,
  );

  const port = configService.get<Config['PORT']>('PORT', Default.PORT);

  await app.listen(port);

  const url = await app.getUrl();

  Logger.log(
    `Nest application running in ${nodeEnv} environment`,
    NestApplication.name,
  );

  Logger.log(`Nest application listening at ${url}`, NestApplication.name);
};

bootstrap();
