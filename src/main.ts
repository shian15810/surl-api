import { NestApplication, NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConfigDefault } from './config/config.constants';
import { ConfigService } from './config/config.service';
import { LoggerService } from './logger/logger.service';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const loggerService = app.get(LoggerService);

  const NODE_ENV = configService.get('NODE_ENV') ?? ConfigDefault.NODE_ENV;
  const PORT = configService.get('PORT') ?? ConfigDefault.PORT;

  if (NODE_ENV !== 'test') {
    app.enableShutdownHooks();
  }

  app.useLogger(loggerService);

  await app.listen(PORT);

  const url = await app.getUrl();

  loggerService.log(
    `Nest application running in ${NODE_ENV} environment`,
    NestApplication.name,
  );
  loggerService.log(
    `Nest application listening at ${url}`,
    NestApplication.name,
  );
};

void bootstrap();
