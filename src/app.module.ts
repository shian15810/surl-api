import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validate } from './config';

@Module({
  imports: [ConfigModule.forRoot({ validate })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
