import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { NodeEnv, env } from '../env';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const logOptions: Prisma.LogLevel[] = ['info', 'warn', 'error'];
    if (env.NODE_ENV === NodeEnv.local) {
      logOptions.push('query');
    }
    super({ log: logOptions });
  }

  async onModuleInit() {
    this.logger.log(`Initializing Prisma with db: ${env.DATABASE_URL}`);
    await this.$connect();
  }
}
