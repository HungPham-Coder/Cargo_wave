import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  providers: [RolesService], 
  exports: [RolesService], controllers: [RolesController],
})
export class RolesModule {}
