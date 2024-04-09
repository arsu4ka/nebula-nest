import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

export enum NodeEnv {
  local = 'local',
  prod = 'prod',
}

const envSchema = z.object({
  NODE_ENV: z.nativeEnum(NodeEnv),
  PORT: z.coerce.number().int().gt(0),
  TWITTER_CLIENT_ID: z.string(),
  TWITTER_CLIENT_SECRET: z.string(),
  TWEETSCOUT_API_KEY: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRE: z.string(),
  TARGET_TWEETS: z.string().transform((s) => s.split(',')),
  TARGET_USERNAMES: z.string().transform((s) => s.split(',')),
  DATABASE_URL: z.string(),
});

export const env = envSchema.parse(process.env);
