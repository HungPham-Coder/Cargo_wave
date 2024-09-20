import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/entities/permission.entity';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Permission])],
    providers: [PermissionsService],
    exports: [PermissionsService], controllers: [PermissionsController],
})
export class PermissionsModule {}
