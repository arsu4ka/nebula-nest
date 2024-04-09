import { ApiProperty } from '@nestjs/swagger';

export class CheckResultEntity {
  @ApiProperty()
  isTaskCompleted: boolean;

  constructor(isTaskCompleted: boolean) {
    this.isTaskCompleted = isTaskCompleted;
  }
}
