import { Module } from '@nestjs/common';
import { TweetScoutService } from './tweet-scout.service';

@Module({
  providers: [TweetScoutService],
  exports: [TweetScoutService],
})
export class TweetScoutModule {}
