import validator from 'validator';
import { z } from 'zod';

export const Config = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.string().refine(validator.isPort).transform(validator.toInt),
});

export type Config = Readonly<z.infer<typeof Config>>;
