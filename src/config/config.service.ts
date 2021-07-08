import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

import { ConfigDefault } from './config.constants';
import type { Config } from './config.interface';

@Injectable()
export class ConfigService extends NestConfigService<Config> implements Config {
  public override get<Key extends keyof Config>(
    key: Key,
  ): Config[Key] | undefined {
    return super.get(key);
  }

  public readonly NODE_ENV = this.get('NODE_ENV') ?? ConfigDefault.NODE_ENV;

  public readonly PORT = this.get('PORT') ?? ConfigDefault.PORT;
}
