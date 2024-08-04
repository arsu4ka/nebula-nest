import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TwitterOauthModule } from './twitter-oauth/twitter-oauth.module';
import { AuthConfig } from './auth.config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    UsersModule,
    PassportModule,
    TwitterOauthModule,
    JwtModule.registerAsync({
      useFactory: (config: AuthConfig) => ({
        secret: config.jwtSecret,
        signOptions: { expiresIn: config.jwtExpire },
      }),
      inject: [],
    }),
  ],
})
export class AuthModule {}
