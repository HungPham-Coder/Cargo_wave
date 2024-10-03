import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MicroserviceClientModule } from '../microservice-client/microservice-client.module';


@Module({
  imports: [
    MicroserviceClientModule
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], 
})
export class UsersModule {}
