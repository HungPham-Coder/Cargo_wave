import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
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

    //Get all data of permissions with paging
    @Get('findAllWithPaging')
    async findAllWithPaging(@Query() paginationDTO: PaginationDTO) {
        try {
            console.log('Pagination DTO received:', paginationDTO);
            const response = this.permissionService.findAllWithPaging(paginationDTO)
            return response;
        } catch (error) {
            console.error('Error fetching permissions with paging:', error);
            throw new HttpException('Error fetching permissions with paging', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
