import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../users/entities/user.entity';
import { CheckResultEntity } from './entities/check-result.entity';
import { UsersService } from '../users/users.service';
import { TweetScoutService } from '../tweet-scout/tweet-scout.service';
import tasksConfig, { TasksConfig } from './tasks.config';

@Injectable()
export class TasksService {
  constructor(
    private readonly tweetScoutService: TweetScoutService,
    private readonly usersService: UsersService,
    @Inject(tasksConfig.KEY)
    private readonly config: TasksConfig,
  ) {}

  async checkUserLiked(user: UserEntity): Promise<CheckResultEntity> {
    const checkResult = new CheckResultEntity(false);

    if (user.userLiked) {
      checkResult.isTaskCompleted = true;
      return checkResult;
    }

    const resultPerPost = await Promise.all(
      this.config.targetTweets.map((url) => this.tweetScoutService.isUserLiked(user.username, url)),
    );
    if (resultPerPost.includes(false)) {
      checkResult.isTaskCompleted = false;
      return checkResult;
    }

    await this.usersService.updateUserTaskStatus(user.id, { userLiked: true });
    checkResult.isTaskCompleted = true;
    return checkResult;
  }

  async checkUserFollowed(user: UserEntity): Promise<CheckResultEntity> {
    const checkResult = new CheckResultEntity(false);

    if (user.userFollowed) {
      checkResult.isTaskCompleted = true;
      return checkResult;
    }

    const resultPerUser = await Promise.all(
      this.config.targetUsernames.map((username) =>
        this.tweetScoutService.isUserFollowed(user.username, username),
      ),
    );
    if (resultPerUser.includes(false)) {
      checkResult.isTaskCompleted = false;
      return checkResult;
    }

    await this.usersService.updateUserTaskStatus(user.id, {
      userFollowed: true,
    });
    checkResult.isTaskCompleted = true;
    return checkResult;
  }

  async checkUserQuoted(user: UserEntity, ref?: string): Promise<CheckResultEntity> {
    const checkResult = new CheckResultEntity(false);

    if (user.userQuoted) {
      checkResult.isTaskCompleted = true;
      return checkResult;
    } else if (!user.userLiked || !user.userFollowed) {
      throw new BadRequestException('you should complete like and follow tasks first');
    }

    const resultPerTweet = await Promise.all(
      this.config.targetTweets.map((url) =>
        this.tweetScoutService.isUserQuoted(user.username, url),
      ),
    );
    if (resultPerTweet.includes(false)) {
      checkResult.isTaskCompleted = false;
      return checkResult;
    }

    const awaitable: Promise<void>[] = [];
    awaitable.push(
      this.usersService.updateUserTaskStatus(user.id, {
        userFollowed: true,
      }),
    );
    if (ref && ref !== user.username) {
      awaitable.push(this.usersService.increaseUserRefCount(ref));
    }
    await Promise.all(awaitable);

    checkResult.isTaskCompleted = true;
    return checkResult;
  }
}
