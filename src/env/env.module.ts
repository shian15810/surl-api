import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvService } from './env.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: EnvService.validate,
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
