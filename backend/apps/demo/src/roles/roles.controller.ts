import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { Roles, RolesService } from './roles.service';
import { CreateRoleDTO } from './roles.dto/create-role-request.dto';
import { AssignPermissionDTO } from './roles.dto/assign-permission-dto';
import { UpdatePermissionsDTO } from './roles.dto/update-permission-request-dto';
import { PaginationDTO } from '../users/create-user-request.dto';

@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) { }

    //Get all data of roles
    @HttpCode(HttpStatus.OK)
    @Get('findAllWithPaging')
    async findAllWithPaging(@Query() paginationDTO: PaginationDTO): Promise<{ data: Roles[], total: number }> {
        return this.roleService.findAllWithPaging(paginationDTO);
    }

    // Get roles by name
    @HttpCode(HttpStatus.OK)
    @Get(':name')
    findOneByName(@Param() params: any) {
        return this.roleService.findOneByName(params.name)
    }

    // Create list of roles
    @Post('createRoles')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createRoleDTO: CreateRoleDTO) {
        return this.roleService.createRoles(createRoleDTO);
    }

    // Update the status isDeleted of a role by ID
    @Put('updateRoleStatus/:id/:isDisabled')
    @HttpCode(HttpStatus.OK)
    async updateRoleStatus(
        @Param('id') id: string,
        @Param('isDisabled') isDisabled: string // This will be a string in URL
    ) {
        // Convert isDisabled to a boolean
        try {
            const isDisabledBool = isDisabled.toLowerCase() === 'true';
            const body = this.roleService.updateRoleStatus(id, isDisabledBool);
            if (!body) {
                throw new HttpException(`Role with ID ${id} not found`, HttpStatus.NOT_FOUND);
            }
            return body;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    // Update the name of a role by ID
    @Put('updateRoleNameByID/:id/name')
    @HttpCode(HttpStatus.OK)
    async updateRoleName(
        @Param('id') id: string,
        @Body('name') newName: string
    ) {
        try {
            const body = await this.roleService.updateRoleName(id, newName);
            if (!body) {
                throw new HttpException(`Role with ID ${id} not found`, HttpStatus.NOT_FOUND);
            }
            return body;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('assignPermissions')
    @HttpCode(HttpStatus.OK)
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
