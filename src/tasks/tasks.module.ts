import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { UsersModule } from '../users/users.module';
import { TweetScoutService } from './tweet-scout/tweet-scout.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TweetScoutService],
  imports: [UsersModule],
})
export class TasksModule {}
