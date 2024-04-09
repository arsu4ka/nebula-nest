import { ApiProperty } from '@nestjs/swagger';

export class AuthLinkEntity {
  @ApiProperty()
  link: string;

  constructor(link: string) {
    this.link = link;
  }
}
