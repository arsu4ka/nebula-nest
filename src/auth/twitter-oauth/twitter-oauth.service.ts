import { Inject, Injectable } from '@nestjs/common';
import { buildQueryString, generateRandomHex } from '../../common/utils';
import { TwitterToken } from '../../common/types';
import axios from 'axios';
import { TwitterUser } from '../schemas/twitter.schema';
import { TwitterOauthConfig, twitterOauthConfig } from './twitter-oauth.config';

@Injectable()
export class TwitterOauthService {
  private readonly defaultCodeChallenge = 'nebula';
  readonly defaultScopes = [
    'users.read',
    'tweet.read',
    'follows.read',
    'like.read',
    'offline.access',
  ];

  constructor(@Inject(twitterOauthConfig.KEY) private readonly config: TwitterOauthConfig) {}

  private getBasicAuthHeader(): string {
    return `Basic ${Buffer.from(`${this.config.clientId}:${this.config.clientSecret}`).toString(
      'base64',
    )}`;
  }

  getAuthLink(redirectUrl: string): string {
    const url = new URL('https://twitter.com/i/oauth2/authorize');
    const params: Record<string, string> = {
      code_challenge_method: 'plain',
      code_challenge: this.defaultCodeChallenge,
      state: generateRandomHex(16),
      client_id: this.config.clientId,
      scope: this.defaultScopes.join(' '),
      response_type: 'code',
      redirect_uri: redirectUrl,
    };
    url.search = buildQueryString(params);
    return url.toString();
  }

  async getAccessToken(code: string, redirect_uri: string): Promise<TwitterToken | null> {
    const response = await axios.post<TwitterToken>(
      'https://api.twitter.com/2/oauth2/token',
      new URLSearchParams({
        code: code,
        grant_type: 'authorization_code',
        client_id: this.config.clientId,
        redirect_uri: redirect_uri,
        code_verifier: this.defaultCodeChallenge,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: this.getBasicAuthHeader(),
        },
        validateStatus: () => true,
      },
    );
    return response.status === 200 ? response.data : null;
  }

  async getMe(accessToken: string): Promise<TwitterUser> {
    const response = await axios.get<{ data: TwitterUser }>('https://api.twitter.com/2/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  }
}
