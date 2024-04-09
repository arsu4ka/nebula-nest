import { Controller, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CheckResultEntity } from './entities/check-result.entity';
import { User } from '../auth/decorators/user.decorator';
import { UserEntity } from '../users/entities/user.entity';

@Controller('tasks')
@ApiTags('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('check-like')
  @ApiBearerAuth()
  @ApiOkResponse({ type: CheckResultEntity })
  async checkLike(@User() user: UserEntity) {
    return this.tasksService.checkUserLiked(user);
  }

  @Post('check-follow')
  @ApiBearerAuth()
  @ApiOkResponse({ type: CheckResultEntity })
  async checkFollow(@User() user: UserEntity) {
    return this.tasksService.checkUserFollowed(user);
  }

  @Post('check-quote')
  @ApiBearerAuth()
  @ApiOkResponse({ type: CheckResultEntity })
  @ApiQuery({ name: 'ref', required: false })
  async checkQuote(@User() user: UserEntity, @Query('ref') ref?: string) {
    return this.tasksService.checkUserQuoted(user, ref);
  }
}
