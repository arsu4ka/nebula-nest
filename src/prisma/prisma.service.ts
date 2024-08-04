import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const logOptions: Prisma.LogLevel[] = ['info', 'warn', 'error'];
    if (process.env.NODE_ENV === 'local') {
      logOptions.push('query');
    }
    super({ log: logOptions });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
    this.logger.log('Prisma client connected');
  }
}
