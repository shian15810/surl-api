import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';
import { LoggerService } from './logger.service';

@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: (envService: EnvService) => ({
        pinoHttp: {
          autoLogging: envService.NODE_ENV !== EnvService.NODE_ENV.test,
          prettyPrint: envService.NODE_ENV === EnvService.NODE_ENV.development,
        },
      }),
    }),
  ],
  providers: [LoggerService],
})
export class LoggerModule {}
