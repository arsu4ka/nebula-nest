import { User } from '@prisma/client';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static toEntity(user: User): UserEntity {
    return new UserEntity(
      user.id,
      user.name,
      user.username,
      user.refCount,
      user.userLiked,
      user.userQuoted,
      user.userFollowed,
    );
  }
}
