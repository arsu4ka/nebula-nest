import { Module } from '@nestjs/common';
import { TwitterOauthService } from './twitter-oauth.service';

@Module({
  providers: [TwitterOauthService],
  exports: [TwitterOauthService],
})
export class TwitterOauthModule {}
