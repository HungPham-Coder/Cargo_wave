import { Module } from '@nestjs/common';
import { ResponseController } from './response.controller';
import { ResponseService } from './response.service';
import { NotificationModule } from './notification/notification.module';


import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '130600',
      // database: 'CargoWave',
      database: 'postgres',
      entities: [
      ],
      synchronize: true,
    }),
    NotificationModule],
  controllers: [ResponseController],
  providers: [ResponseService],
})
export class ResponseModule { }
