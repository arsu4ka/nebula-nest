import { ConfigType, registerAs } from '@nestjs/config';

const tasksConfig = registerAs('tasks', () => ({
  targetTweets: JSON.parse(process.env.TARGET_TWEETS!) as string[],
  targetUsernames: JSON.parse(process.env.TARGET_USERNAMES!) as string[],
}));

export default tasksConfig;
export type TasksConfig = ConfigType<typeof tasksConfig>;
