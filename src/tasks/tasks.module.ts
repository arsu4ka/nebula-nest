import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [UsersModule],
})
export class TasksModule {}
