import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { env } from '../env';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    this.logger.log(`Initializing Prisma with db: ${env.DATABASE_URL}`);
    await this.$connect();
  }
}
