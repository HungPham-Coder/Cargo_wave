import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { MicroserviceClientModule } from '../microservice-client/microservice-client.module';
import { RolesController } from './roles.controller';

@Module({
  imports: [
    MicroserviceClientModule
  ],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService],
})
export class RolesModule {}
