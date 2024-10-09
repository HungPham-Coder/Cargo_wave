import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDTO } from './create-permission-request.dto';
import { Permission } from '../entities/permission.entity';
import { PaginationDTO } from '../users/create-user-request.dto';

export type Permissions = any;

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permissions>,
  ) { }

  async findAll(): Promise<Permission[]> {
    try {
      return await this.permissionsRepository.find();
    } catch (error) {
      console.error('Error finding all permissions: ', error);
      throw new Error('Error finding all permissions');
    }
  }

  async findPermissionEnabled(): Promise<Permission[]> {
    try {
      // Retrieve permissions with status true
      return await this.permissionsRepository.find({ where: { isDisabled: false } });
    } catch (error) {
      console.error('Error finding all permissions: ', error);
      throw new Error('Error finding all permissions');
    }
  }

  async findAllWithPaging(paginationDTO: PaginationDTO): Promise<{ data: Permissions[], total: number }> {
    const { search = '', pageIndex = 0, pageSize = 10 } = paginationDTO;

    // Ensure pageIndex and pageSize are numbers
    const pageIndexNumber = Number(pageIndex);
    const pageSizeNumber = Number(pageSize);

    try {
      // Build query with or without search filter
      const query = this.permissionsRepository.createQueryBuilder('permissions');

      if (search) {
        query.where('LOWER(permissions.name) LIKE LOWER(:search)', { search: `%${search.toLowerCase()}%` });
      }
      query.orderBy('permissions.isDisabled', 'ASC').addOrderBy('permissions.name', 'ASC');

      const [data, total] = await Promise.all([
        query.skip(pageIndexNumber * pageSizeNumber)
          .take(pageSizeNumber)
          .getMany(),
        query.getCount(),
      ]);

      return { data, total };
    } catch (error) {
      console.error('Error finding permissions: ', error);
      throw new Error('Error finding permissions');
    }
  }
  // Method to find a permission by name
  async findOneByName(name: string): Promise<Permissions> {
    try {
      const permission = await this.permissionsRepository.findOneBy({ name });
      console.log("permission: ", permission)
      return permission;
    } catch (error) {
      console.error('Error finding permission by name:', error);
      throw new Error('Error finding permission by name');
    }
  }

  // Method to find a permission by ID
  async findOneById(id: string): Promise<Permissions | undefined> {
    try {
      // Find the permission where ID matches the given ID
      const permission = await this.permissionsRepository.findOne({ where: { id } });
      return permission;
    } catch (error) {
      console.error('Error finding permission by ID:', error);
      throw new Error('Error finding permission by ID');
    }
  }

  //   Method to create a new permission
  async createPermissions(createPermissionDTO: CreatePermissionDTO): Promise<Permission[]> {
    const permissions = createPermissionDTO.names.map(name => {
      const permission = new Permission();
      permission.name = name;
      permission.isDisabled = false;
      return permission;
    });
    return await this.permissionsRepository.save(permissions);
  }

  // Method to update the status of a permission
  async updatePermissionStatus(id: string, isDisabled: boolean): Promise<Permission | null> {
    try {
      // Find the permission by ID
      const permission = await this.permissionsRepository.findOne({ where: { id } });

      if (!permission) {
        console.error(`Permission with ID ${id} not found.`);
        return null;
      }
      // Set the permission's status based on the isDisabled flag
      permission.isDisabled = isDisabled;
      // Save the updated permission
      return await this.permissionsRepository.save(permission);
    } catch (error) {
      console.error('Error updating permission status:', error);
      throw new Error('Error updating permission status');
    }
  }

  // Method to update the name of a permission by ID
  async updatePermissionName(id: string, newName: string): Promise<Permission | null> {
    try {
      // Find the permission by ID
      const permission = await this.permissionsRepository.findOne({ where: { id } });

      if (!permission) {
        console.error(`Permission with ID ${id} not found.`);
        return null;
      }
      // Set the new name for the permission
      permission.name = newName;
      // Save the updated permission
      return await this.permissionsRepository.save(permission);
    } catch (error) {
      console.error('Error updating permission name:', error);
      throw new Error('Error updating permission name');
    }
  }
}
