import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { LoggerService } from './logger.service';

@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        pinoHttp: {
          autoLogging: configService.NODE_ENV !== 'test',
          prettyPrint:
            configService.NODE_ENV === 'development' ||
            (configService.NODE_ENV === 'test' && !configService.CI),
        },
      }),
    }),
  ],
  providers: [LoggerService],
})
export class LoggerModule {}
