import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { User } from '../entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission, User])],
  providers: [RolesService], 
  exports: [RolesService], controllers: [RolesController],
})
export class RolesModule {}
