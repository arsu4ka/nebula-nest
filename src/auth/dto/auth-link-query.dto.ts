import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';

export const allowedRedirectUrls = [
  'http://localhost:3000/mint',
  'https://www.blastshot.org/mint',
  'http://localhost:3000/redirect',
] as const;

export class AuthLinkQueryDto {
  @IsOptional()
  @IsString()
  @IsIn(allowedRedirectUrls)
  @ApiProperty({ required: false, enum: allowedRedirectUrls })
  redirect_url = allowedRedirectUrls[0];
}
