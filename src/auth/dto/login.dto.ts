import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { allowedRedirectUrls } from './auth-link-query.dto';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  state: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  code: string;

  @IsOptional()
  @IsString()
  @IsIn(allowedRedirectUrls)
  @ApiProperty({ required: false, enum: allowedRedirectUrls })
  redirect_url = allowedRedirectUrls[0];

  constructor(state: string, code: string) {
    this.state = state;
    this.code = code;
  }
}
