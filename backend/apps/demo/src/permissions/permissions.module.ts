import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { Permission } from '../entities/permission.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Permission])],
    providers: [PermissionsService],
    exports: [PermissionsService], controllers: [PermissionsController],
})
export class PermissionsModule {}
