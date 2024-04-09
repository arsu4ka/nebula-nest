import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('base')
export class AppController {
  @Get('health-check')
  getHello(): { ok: boolean } {
    return { ok: true };
  }
}
