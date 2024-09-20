import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';

@Module({
  providers: [RoutesService]
})
export class RoutesModule {}
