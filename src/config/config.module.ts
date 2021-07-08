import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { Config } from './config.interface';
import { ConfigService } from './config.service';

@Module({
  imports: [
    NestConfigModule.forRoot({
      validate: Config.parse,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
