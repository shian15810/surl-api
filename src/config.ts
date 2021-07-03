import validator from 'validator';
import { z } from 'zod';

const NodeEnvEnum = z.enum(['development', 'test', 'production']);

export const NodeEnv = NodeEnvEnum.enum;

export const Default = {
  NODE_ENV: NodeEnv.development,
  PORT: 3000,
} as const;

const Config = z.object({
  NODE_ENV: NodeEnvEnum.default(Default.NODE_ENV),
  PORT: z
    .string()
    .default(Default.PORT.toString())
    .refine(validator.isPort)
    .transform(validator.toInt),
});

export type Config = z.infer<typeof Config>;

export const validate = Config.parse;
