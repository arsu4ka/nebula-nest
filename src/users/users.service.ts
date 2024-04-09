import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { UserMapper } from './mappers/user.mapper';
import { User } from '@prisma/client';

export type CreateUserOptions = Pick<
  User,
  'id' | 'name' | 'refreshToken' | 'username'
>;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByIdSafe(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? UserMapper.toEntity(user) : user;
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.findByIdSafe(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(user: CreateUserOptions): Promise<UserEntity> {
    const createdUser = await this.prisma.user.create({ data: user });
    return UserMapper.toEntity(createdUser);
  }

  async getTopUsersByRefCount(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      take: 100,
      orderBy: {
        refCount: 'desc',
      },
    });
    return users.map((u) => UserMapper.toEntity(u));
  }

  async updateUserTaskStatus(
    userId: string,
    statuses: {
      userLiked?: boolean;
      userQuoted?: boolean;
      userFollowed?: boolean;
    },
  ): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { ...statuses },
    });
  }

  async increaseUserRefCount(username: string): Promise<void> {
    await this.prisma.user.update({
      where: { username },
      data: {
        refCount: {
          increment: 1,
        },
      },
    });
  }
}
