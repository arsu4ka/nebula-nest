import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  state: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  code: string;

  constructor(state: string, code: string) {
    this.state = state;
    this.code = code;
  }
}
