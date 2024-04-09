import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthLinkEntity } from './entities/auth-link.entity';
import { AuthEntity } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('link')
  @Public()
  @ApiOkResponse({ type: AuthLinkEntity })
  async getAuthLink(): Promise<AuthLinkEntity> {
    return this.authService.getAuthLink();
  }

  @Post('login')
  @Public()
  @ApiOkResponse({ type: AuthEntity })
  async login(@Body() loginDto: LoginDto): Promise<AuthEntity> {
    return this.authService.login(loginDto);
  }
}
