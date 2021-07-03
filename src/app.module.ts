import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule } from './env/env.module';
import { EnvService } from './env/env.service';

@Module({
  imports: [
    EnvModule,
    LoggerModule.forRootAsync({
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
