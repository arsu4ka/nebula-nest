import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  refCount: number;

  @ApiProperty()
  userLiked: boolean;

  @ApiProperty()
  userQuoted: boolean;

  @ApiProperty()
  userFollowed: boolean;

  constructor(
    id: string,
    name: string,
    username: string,
    refCount: number,
    userLiked: boolean,
    userQuoted: boolean,
    userFollowed: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.refCount = refCount;
    this.userLiked = userLiked;
    this.userQuoted = userQuoted;
    this.userFollowed = userFollowed;
  }
}
