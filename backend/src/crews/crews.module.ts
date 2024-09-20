import { Module } from '@nestjs/common';
import { CrewsService } from './crews.service';
import { CrewsController } from './crews.controller';

@Module({
  providers: [CrewsService],
  controllers: [CrewsController]
})
export class CrewsModule {}
