import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import validator from 'validator';
import { z } from 'zod';
import type { Env } from './env.interface';

@Injectable()
export class EnvService implements Env {
  public constructor(private readonly configService: ConfigService) {}

  private static readonly NodeEnv = z.enum([
    'development',
    'test',
    'production',
  ]);

  public static readonly NODE_ENV = this.NodeEnv.enum;

  private static readonly Default = {
    NODE_ENV: this.NODE_ENV.development,
    PORT: 3000,
  } as const;

  private static readonly Env = z.object({
    NODE_ENV: this.NodeEnv.default(this.Default.NODE_ENV),
    PORT: z
      .string()
      .default(this.Default.PORT.toString())
      .refine(validator.isPort)
      .transform(validator.toInt),
  });

  public static readonly validate = this.Env.parse;

  public get NODE_ENV(): Env['NODE_ENV'] {
    return this.configService.get('NODE_ENV', EnvService.Default.NODE_ENV);
  }

  public get PORT(): Env['PORT'] {
    return this.configService.get('PORT', EnvService.Default.PORT);
  }
}
