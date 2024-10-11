import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateRoleDTO } from './roles.dto/create-role-request.dto';
import { AssignPermissionDTO } from './roles.dto/assign-permission-dto';
import { Permission } from '../entities/permission.entity';
import { Role } from '../entities/role.entity';
import { PaginationDTO } from '../users/users.dto/create-user-request.dto';


export type Roles = any;
export type Permissions = any;

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Roles>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permissions>,
  ) { }

  // Method to find all roles
  async findAllWithPaging(paginationDTO: PaginationDTO): Promise<{ data: Roles[], total: number }> {
    const { search = '', pageIndex = 0, pageSize = 10, status } = paginationDTO;

    const pageIndexNumber = Number(pageIndex);
    const pageSizeNumber = Number(pageSize);

    try {
      const query = this.rolesRepository.createQueryBuilder('roles')
        .leftJoinAndSelect('roles.permissions', 'permissions');

      // Filter by search term if provided
      if (search) {
        query.where('LOWER(roles.name) LIKE LOWER(:search)', { search: `%${search.toLowerCase()}%` });
      }

      // Apply the status filter if it's defined
      if (status !== undefined) {
        query.andWhere('roles.isDisabled = :status', { status });
      }

      // Count the total number of results after filtering
      const total = await query.getCount();

      // Apply pagination and get the data
      const data = await query
        .skip(pageIndexNumber * pageSizeNumber)
        .take(pageSizeNumber)
        .orderBy('roles.isDisabled', 'ASC')
        .addOrderBy('roles.name', 'ASC')
        .getMany();

      return { data, total };
    } catch (error) {
      console.error('Error finding roles: ', error);
      throw new Error('Error finding roles');
    }
  }


  // Method to find a role by name
  async findOneByName(name: string): Promise<Roles> {
    try {
      const role = await this.rolesRepository.findOneBy({ name });
      console.log("role: ", role)
      return role;
    } catch (error) {
      console.error('Error finding role by name:', error);
      throw new Error('Error finding role by name');
    }
  }

  // Method to find a role by ID
  async findOneById(id: string): Promise<Roles | undefined> {
    try {
      // Find the role where ID matches the given ID
      const role = await this.rolesRepository.findOne({ where: { id } });
      return role;
    } catch (error) {
      console.error('Error finding role by ID:', error);
      throw new Error('Error finding role by ID');
    }
  }

  // Method to create a new role
  async createRoles(createRoleDTO: CreateRoleDTO): Promise<Role[]> {
    const roles = createRoleDTO.names.map(name => {
      const role = new Role();
      role.name = name;
      role.isDisabled = false;
      return role;
    });
    return await this.rolesRepository.save(roles);
  }

  // Method to update the status of a role
  async updateRoleStatus(id: string, isDisabled: boolean): Promise<Role | null> {
    try {
      const role = await this.rolesRepository.findOne({ where: { id } });
      if (!role) {
        console.error(`Role with ID ${id} not found.`);
        throw new HttpException(`Role with ID ${id} not found.`, HttpStatus.NOT_FOUND);
      }

      // Update the role's isDisabled status
      role.isDisabled = isDisabled;

      // Save the updated role and return the result
      return await this.rolesRepository.save(role);
    } catch (error) {
      console.error('Error updating role status:', error);
      throw new HttpException('Error updating role status: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  // Method to update the name of a role by ID
  async updateRoleName(id: string, newName: string): Promise<Role | null> {
    try {
      // Find the role by ID
      const role = await this.rolesRepository.findOne({ where: { id } });

      if (!role) {
        console.error(`Role with ID ${id} not found.`);
        return null;
      }
      // Set the new name for the role
      role.name = newName;
      // Save the updated role
      return await this.rolesRepository.save(role);
    } catch (error) {
      console.error('Error updating role name:', error);
      throw new Error('Error updating role name');
    }
  }

  // Method to update the name of a role by ID
  async assignPermissions(assignPermissionDTO: AssignPermissionDTO): Promise<Role> {
    const { roleId, permissionIDs } = assignPermissionDTO;
    // Find the role with the given ID
    const role = await this.rolesRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });
    if (!role) {
      throw new Error('Role not found');
    }
    // Find the permissions by the provided IDs
    const permissionsToAdd = await this.permissionRepository.findBy({
      id: In(permissionIDs),
    });
    // Create a set of existing permission IDs for easier lookup
    const existingPermissionIDs = new Set(role.permissions.map((p: { id: any; }) => p.id));
    // Add new permissions
    const newPermissions = permissionsToAdd.filter(p => !existingPermissionIDs.has(p.id));
    role.permissions = [...role.permissions, ...newPermissions];
    // Remove permissions that are not included in the new list
    role.permissions = role.permissions.filter(p => permissionIDs.includes(p.id) || newPermissions.includes(p));
    // Save the updated role
    return this.rolesRepository.save(role);
  }

  async updatePermissions(roleId: string, permissions: string[]): Promise<Role> {
    const role = await this.rolesRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });

    if (!role) {
      throw new Error('Role not found');
    }

    // Fetch permission entities based on the provided IDs
    const permissionEntities = await this.permissionRepository.find({
      where: { id: In(permissions) },
    });

    // Update the role's permissions
    role.permissions = permissionEntities;

    return await this.rolesRepository.save(role); // Save and return the updated role
  }

  // Method to get permissions assigned to a role by ID
  async getPermissionsByRoleId(roleId: string): Promise<Permission[]> {
    const role = await this.rolesRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'], // Load permissions relation
    });

    if (!role) {
      throw new Error('Role not found');
    }

    return role.permissions; // Return the assigned permissions
  }

  // Method to get permissions not assigned to a role by ID
  async getPermissionsNotAssignedByRoleId(roleId: string): Promise<Permission[]> {
    const role = await this.rolesRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'], // Load permissions relation
    });

    if (!role) {
      throw new Error('Role not found');
    }

    // Fetch all permissions from the database
    const allPermissions = await this.permissionRepository.find();

    // Filter out the permissions that are already assigned to the role
    const assignedPermissionIds = new Set(role.permissions.map(permission => permission.id));
    const notAssignedPermissions = allPermissions.filter(permission => !assignedPermissionIds.has(permission.id));

    return notAssignedPermissions; // Return the not assigned permissions
  }
}
