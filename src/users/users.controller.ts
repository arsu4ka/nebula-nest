import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { User } from '../auth/decorators/user.decorator';
import { Public } from '../auth/decorators/public.decorator';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async getMe(@User() user: UserEntity): Promise<UserEntity> {
    return user;
  }

  @Get('leaderboard')
  @Public()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async getLeaderboard(): Promise<UserEntity[]> {
    return this.usersService.getTopUsersByRefCount();
  }
}
