import { Inject, Injectable } from '@nestjs/common';
import {
  TweetScoutRequestOptions,
  TwitterLikedResponse,
  TwitterQuoteResponse,
  TwitterFollowResponse,
} from './tweet-scout.types';
import tweetScoutConfig, { TweetScoutConfig } from './tweet-scout.config';

@Injectable()
export class TweetScoutService {
  readonly apiUrl = 'https://api.tweetscout.io/api';

  constructor(@Inject(tweetScoutConfig.KEY) private readonly config: TweetScoutConfig) {}

  private async sendTweetScoutRequest<T>(options: TweetScoutRequestOptions): Promise<T> {
    const response = await fetch(`${this.apiUrl}/${options.path}`, {
      body: JSON.stringify(options.body),
      method: options.method ?? 'POST',
      headers: {
        ApiKey: this.config.apiKey,
        'Content-Type': 'application/json',
      },
    });
    const data = (await response.json()) as T;
    return data;
  }

  async isUserLiked(username: string, tweetUrl: string): Promise<boolean> {
    let next_cursor = '';
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const data = await this.sendTweetScoutRequest<TwitterLikedResponse>({
        path: 'check-like',
        body: {
          tweet_link: tweetUrl,
          user_handler: username,
          next_cursor,
        },
      });

      if (data.like) {
        return true;
      } else if (data.next_cursor === '') {
        return false;
      }

      next_cursor = data.next_cursor;
    }
  }

  async isUserQuoted(username: string, tweetUrl: string): Promise<boolean> {
    const quoteText = `I am farming points on @nebuladexblast! Join via my ref link 👉http://nebulaswap.org/${username}`;
    const data = await this.sendTweetScoutRequest<TwitterQuoteResponse>({
      body: {
        tweet_link: tweetUrl,
        user_handler: username,
      },
      path: 'check-quoted',
    });

    return data.text.includes(quoteText);
  }

  async isUserFollowed(username: string, targetUsername: string): Promise<boolean> {
    const data = await this.sendTweetScoutRequest<TwitterFollowResponse>({
      path: 'check-follow',
      body: {
        project_handler: targetUsername,
        user_handler: username,
      },
    });
    return data.follow;
  }
}
