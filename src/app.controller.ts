import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './auth/decorators/public.decorator';

@Controller()
@ApiTags('base')
export class AppController {
  @Get('health-check')
  @Public()
  getHello(): { ok: boolean } {
    return { ok: true };
  }
}
