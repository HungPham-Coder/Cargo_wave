import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { MicroserviceClientModule } from '../microservice-client/microservice-client.module';

@Module({
  imports: [
    MicroserviceClientModule
  ],
  providers: [PermissionsService],
  controllers: [PermissionsController],
  exports: [PermissionsService],
})
export class PermissionsModule { }
