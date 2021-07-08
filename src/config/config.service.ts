import { Injectable } from '@nestjs/common';
import type { ConfigGetOptions } from '@nestjs/config';
import { ConfigService as NestConfigService } from '@nestjs/config';

import { ConfigDefault } from './config.constants';
import type { Config } from './config.interface';

@Injectable()
export class ConfigService extends NestConfigService<Config> implements Config {
  private readonly options: ConfigGetOptions = { infer: true };

  public readonly CI = this.get('CI', this.options) ?? ConfigDefault.CI;

  public readonly NODE_ENV =
    this.get('NODE_ENV', this.options) ?? ConfigDefault.NODE_ENV;

  public readonly PORT = this.get('PORT', this.options) ?? ConfigDefault.PORT;
}
