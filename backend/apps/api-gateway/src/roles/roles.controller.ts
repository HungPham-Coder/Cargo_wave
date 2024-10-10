import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { PermissionsService } from '../permissions/permissions.service';
import { PaginationDTO } from 'apps/demo/src/users/create-user-request.dto';
import { RolesService } from './roles.service';
import { CreateRoleDTO } from 'apps/demo/src/roles/roles.dto/create-role-request.dto';
import { AssignPermissionDTO } from 'apps/demo/src/roles/roles.dto/assign-permission-dto';

@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) { }

    //Get all data of permissions with paging
    @Get('findAllWithPaging')
    async findAllWithPaging(@Query() paginationDTO: PaginationDTO) {
        try {
            console.log('Pagination DTO received:', paginationDTO);
            const response = this.roleService.findAllWithPaging(paginationDTO)
            return response;
        } catch (error) {
            console.error('Error fetching permissions with paging:', error);
            throw new HttpException('Error fetching permissions with paging', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get roles by name
    @Get(':name')
    async findOneByName(@Param() params: any) {
        return this.roleService.findOneByName(params.name)
    }

    @Post('createRoles')
    async create(@Body() createRoleDTO: CreateRoleDTO) {
        return this.roleService.createRoles(createRoleDTO);
    }

    // Update the status isDeleted of a role by ID
    @Put('updateRoleStatus/:id/:isDisabled')
    async updateRoleStatus(
        @Param('id') id: string,
        @Param('isDisabled') isDisabled: boolean
    ) {
        console.log(`Updating role status: ID=${id}, isDisabled=${isDisabled}`);

        try {
            const body = this.roleService.updateRoleStatus(id, isDisabled);
            return body; 
        } catch (error) {
            console.error('Error in controller:', error);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // Update the name of a role by ID
    @Put('updateRoleNameByID/:id/name')
    async updateRoleNameByID(
        @Param('id') id: string,
        @Body('name') newName: string
    ) {
        try {
            const body = this.roleService.updateRoleNameByID(id, newName);
            return body;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('assignPermissions')
    async assignPermissions(@Body() assignPermissionDTO: AssignPermissionDTO) {
        try {
            const body = this.roleService.assignPermissions(assignPermissionDTO)
            if (!body) {
                throw new HttpException(`Assign permissions not found`, HttpStatus.NOT_FOUND);
            }
            return body;

        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
