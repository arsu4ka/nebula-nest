import { ConfigType, registerAs } from '@nestjs/config';

const tweetScoutConfig = registerAs('twitter-scout', () => ({
  apiKey: process.env.TWEET_SCOUT_API_KEY!,
}));

export default tweetScoutConfig;
export type TweetScoutConfig = ConfigType<typeof tweetScoutConfig>;
