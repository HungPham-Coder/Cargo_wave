import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { CreatePermissionDTO } from './create-permission-request.dto';
import { PermissionsService } from './permissions.service';
import { PaginationDTO } from 'apps/demo/src/users/create-user-request.dto';
import { Permission } from 'apps/demo/src/entities/permission.entity';

@Controller('permissions')
export class PermissionsController {
    constructor(private permissionService: PermissionsService) { }

    // Get all data of permissions
    @Get('findAll')
    async findAll() {
        try {
            return this.permissionService.findAll();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
