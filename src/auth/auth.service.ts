import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthLinkEntity } from './entities/auth-link.entity';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../common/types';
import { TwitterOauthService } from './twitter-oauth/twitter-oauth.service';
import { AuthLinkQueryDto } from './dto/auth-link-query.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly twitterOauthService: TwitterOauthService,
  ) {}

  getAuthLink(query: AuthLinkQueryDto): AuthLinkEntity {
    const link = this.twitterOauthService.getAuthLink(query.redirect_url);
    return new AuthLinkEntity(link);
  }

  async login(loginDto: LoginDto): Promise<AuthEntity> {
    const token = await this.twitterOauthService.getAccessToken(
      loginDto.code,
      loginDto.redirect_url,
    );
    if (!token) {
      throw new BadRequestException('Unable to get a token from twitter api');
    }

    const twitterUser = await this.twitterOauthService.getMe(
      token.access_token,
    );

    let user = await this.usersService.findByIdSafe(twitterUser.id);
    if (!user) {
      user = await this.usersService.create({
        id: twitterUser.id,
        name: twitterUser.name,
        username: twitterUser.username,
        refreshToken: token.refresh_token,
      });
    }

    const payload: JwtPayload = {
      userId: user.id,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    const authEntity = new AuthEntity(accessToken);
    return authEntity;
  }
}
