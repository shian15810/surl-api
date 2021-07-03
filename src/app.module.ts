import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule } from './env/env.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [EnvModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
