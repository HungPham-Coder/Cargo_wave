import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { Roles, RolesService } from './roles.service';
import { CreateRoleDTO } from './create-role-request.dto';
import { PaginationDTO } from 'src/users/create-user-request.dto';

@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) { }

    //Get all data of roles
    @HttpCode(HttpStatus.OK)
    @Get('findAll')
    async findAll(@Query() paginationDTO: PaginationDTO): Promise<{ data: Roles[], total: number }> {
        return this.roleService.findAll(paginationDTO);
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
            const updatedRoleStatus = this.roleService.updateRoleStatus(id, isDisabledBool);
            if (!updatedRoleStatus) {
                throw new HttpException(`Role with ID ${id} not found`, HttpStatus.NOT_FOUND);
            }
            return updatedRoleStatus;
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
            const updatedRoleName = await this.roleService.updateRoleName(id, newName);
            if (!updatedRoleName) {
                throw new HttpException(`Role with ID ${id} not found`, HttpStatus.NOT_FOUND);
            }
            return updatedRoleName;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
