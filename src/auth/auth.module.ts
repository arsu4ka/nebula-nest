import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { env } from '../env';
import { JwtStrategy } from './jwt.strategy';
import { TwitterOauthService } from './twitter-oauth/twitter-oauth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, TwitterOauthService],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: env.JWT_EXPIRE },
    }),
  ],
})
export class AuthModule {}
