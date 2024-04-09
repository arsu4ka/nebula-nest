import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthLinkEntity } from './entities/auth-link.entity';
import { AuthEntity } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';
import { AuthLinkQueryDto } from './dto/auth-link-query.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('link')
  @Public()
  @ApiOkResponse({ type: AuthLinkEntity })
  async getAuthLink(@Query() query: AuthLinkQueryDto): Promise<AuthLinkEntity> {
    return this.authService.getAuthLink(query);
  }

  @Post('login')
  @Public()
  @ApiOkResponse({ type: AuthEntity })
  async login(@Body() loginDto: LoginDto): Promise<AuthEntity> {
    return this.authService.login(loginDto);
  }
}
