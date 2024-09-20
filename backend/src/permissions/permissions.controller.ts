import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PaginationDTO } from 'src/users/create-user-request.dto';
import { CreatePermissionDTO } from './create-permission-request.dto';

@Controller('permissions')
export class PermissionsController {
        constructor(private permissionService: PermissionsService) { }

    //Get all data of permissions
    @HttpCode(HttpStatus.OK)
    @Get('findAll')
    async findAll(@Query() paginationDTO: PaginationDTO): Promise<{ data: Permissions[], total: number }> {
        return this.permissionService.findAll(paginationDTO);
    }

    // Get permissions by name
    @HttpCode(HttpStatus.OK)
    @Get(':name')
    findOneByName(@Param() params: any) {
        return this.permissionService.findOneByName(params.name)
    }

    // Create list of permissions
    @Post('createPermissions')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createPermissionDTO: CreatePermissionDTO) {
        return this.permissionService.createPermissions(createPermissionDTO);
    }

    // Update the status isDeleted of a permission by ID
    @Put('updatePermissionStatus/:id/:isDisabled')
    @HttpCode(HttpStatus.OK)
    async updatePermissionStatus(
        @Param('id') id: string,
        @Param('isDisabled') isDisabled: string // This will be a string in URL
    ) {
        // Convert isDisabled to a boolean
        try {
            const isDisabledBool = isDisabled.toLowerCase() === 'true';
            const updatedPermissionStatus = this.permissionService.updatePermissionStatus(id, isDisabledBool);
            if (!updatedPermissionStatus) {
                throw new HttpException(`Permission with ID ${id} not found`, HttpStatus.NOT_FOUND);
            }
            return updatedPermissionStatus;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    // Update the name of a permission by ID
    @Put('updatePermissionNameByID/:id/name')
    @HttpCode(HttpStatus.OK)
    async updatePermissionsName(
        @Param('id') id: string,
        @Body('name') newName: string
    ) {
        try {
            const updatedPermissionName = await this.permissionService.updatePermissionName(id, newName);
            if (!updatedPermissionName) {
                throw new HttpException(`Permission with ID ${id} not found`, HttpStatus.NOT_FOUND);
            }
            return updatedPermissionName;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
