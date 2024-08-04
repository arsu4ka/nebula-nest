import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { TasksModule } from './tasks/tasks.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/jwt.guard';
import { TweetScoutModule } from './tweet-scout/tweet-scout.module';
import { TwitterOauthModule } from './auth/twitter-oauth/twitter-oauth.module';
import { ConfigModule } from '@nestjs/config';
import tweetScoutConfig from './tweet-scout/tweet-scout.config';
import twitterOauthConfig from './auth/twitter-oauth/twitter-oauth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [tweetScoutConfig, twitterOauthConfig],
    }),
    AuthModule,
    UsersModule,
    PrismaModule,
    TasksModule,
    TweetScoutModule,
    TwitterOauthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
