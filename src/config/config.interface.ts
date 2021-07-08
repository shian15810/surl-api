import validator from 'validator';
import { z } from 'zod';

export const Config = z.object({
  CI: z.string().refine(validator.isBoolean).transform(validator.toBoolean),
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.string().refine(validator.isPort).transform(validator.toInt),
});

export type Config = Readonly<z.infer<typeof Config>>;
