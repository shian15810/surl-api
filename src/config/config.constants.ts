import type { Config } from './config.interface';

export const ConfigDefault: Config = {
  CI: false,
  NODE_ENV: 'development',
  PORT: 3000,
};
