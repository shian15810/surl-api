import { NestApplication, NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { LoggerService } from './logger/logger.service';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const loggerService = app.get(LoggerService);

  if (configService.NODE_ENV !== 'test') {
    app.enableShutdownHooks();
  }

  app.useLogger(loggerService);

  app.use(helmet());

  await app.listen(configService.PORT);

  const url = await app.getUrl();

  loggerService.log(
    `Nest application running in ${configService.NODE_ENV} environment`,
    NestApplication.name,
  );
  loggerService.log(
    `Nest application listening at ${url}`,
    NestApplication.name,
  );
};

void bootstrap();
