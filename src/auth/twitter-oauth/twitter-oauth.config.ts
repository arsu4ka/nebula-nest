import { ConfigType, registerAs } from '@nestjs/config';

export const twitterOauthConfig = registerAs('twitter-oauth', () => ({
  clientId: process.env.TWITTER_CLIENT_ID!,
  clientSecret: process.env.TWITTER_CLIENT_SECRET!,
}));

export type TwitterOauthConfig = ConfigType<typeof twitterOauthConfig>;
