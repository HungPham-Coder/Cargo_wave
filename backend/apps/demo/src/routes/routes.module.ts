import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { Route } from '../entities/routes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutesController } from './routes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Route])],
  providers: [RoutesService],
  exports: [RoutesService], controllers: [RoutesController],
})
export class RoutesModule { }
