import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AssignPermissionDTO } from 'apps/demo/src/roles/roles.dto/assign-permission-dto';
import { CreateRoleDTO } from 'apps/demo/src/roles/roles.dto/create-role-request.dto';
import { PaginationDTO } from 'apps/demo/src/users/create-user-request.dto';
import { Observable } from 'rxjs';

@Injectable()
export class RolesService {
    constructor(@Inject('HERO_SERVICE') private readonly client: ClientKafka) { }

    findAll() {
        return this.client.send('hero.permission.findAll', {});
    }

    findAllWithPaging(paginationDTO: PaginationDTO): Observable<any> {
        console.log('Pagination DTO received:', paginationDTO);
        try {
            const response = this.client.send('hero.role.findAllWithPaging', paginationDTO);
            return response;
        } catch (error) {
            console.error('Error in findAllWithPaging:', error);
            throw new HttpException('Error fetching roles with paging', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    findOneByName(name: string) {
        try {
            const response = this.client.send('hero.role.findOneByName', name)
            return response;
        } catch (error) {
            console.error('Error in findAllWithPaging:', error);
            throw new HttpException('Error fetching roles with findOneByName', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    createRoles(createRoleDTO: CreateRoleDTO) {
        try {
            const response = this.client.send('hero.role.createRoles', createRoleDTO)
            return response;
        } catch (error) {
            console.error('Error in findAllWithPaging:', error);
            throw new HttpException('Error fetching roles with createRoleDTO', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    updateRoleStatus(id: string, isDisabled: boolean): Observable<any> {
        try {
            const response = this.client.send('hero.role.updateRoleStatus', { id, isDisabled }); // Await the response
            return response;
        } catch (error) {
            console.error('Error updating role status:', error);
            throw new HttpException('Error updating role status', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    updateRoleNameByID(id: string, newName: string) {
        try {
            const response = this.client.send('hero.role.updateRoleNameByID', { id, newName })
            return response;
        } catch (error) {
            console.error('Error in updateRoleNameByID: ', error);
            throw new HttpException('Error fetching roles with updateRoleNameByID: ', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    assignPermissions(assignPermissionDTO: AssignPermissionDTO) {
        try {
            const response = this.client.send('hero.role.assignPermissions', assignPermissionDTO)
            return response;
        } catch (error) {
            console.error('Error in findAllWithPaging:', error);
            throw new HttpException('Error fetching roles with assignPermissions', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
