import { NestApplication, NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  const loggerService = app.get(Logger);

  app.useLogger(loggerService);

  const envService = app.get(EnvService);

  await app.listen(envService.PORT);

  const url = await app.getUrl();

  loggerService.log(
    `Nest application running in ${envService.NODE_ENV} environment`,
    NestApplication.name,
  );

  loggerService.log(
    `Nest application listening at ${url}`,
    NestApplication.name,
  );
};

void bootstrap();
