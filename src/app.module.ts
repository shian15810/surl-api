import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import type { Config } from './config';
import { Default, NodeEnv, validate } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const NODE_ENV = configService.get<Config['NODE_ENV']>(
          'NODE_ENV',
          Default.NODE_ENV,
        );

        return {
          pinoHttp: {
            prettyPrint: NODE_ENV !== NodeEnv.production,
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
