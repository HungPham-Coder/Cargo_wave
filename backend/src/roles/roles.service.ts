import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDTO } from './create-role-request.dto';
import { PaginationDTO } from 'src/users/create-user-request.dto';

export type Roles = any;

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Roles>,
  ) { }

  // Method to find all roles
  async findAll(paginationDTO: PaginationDTO): Promise<{ data: Roles[], total: number }> {
    const { search = '', pageIndex = 0, pageSize = 10 } = paginationDTO;

    // Ensure pageIndex and pageSize are numbers
    const pageIndexNumber = Number(pageIndex);
    const pageSizeNumber = Number(pageSize);

    try {
      // Build query with or without search filter
      const query = this.rolesRepository.createQueryBuilder('roles');

      if (search) {
        query.where('LOWER(roles.name) LIKE LOWER(:search)', { search: `%${search.toLowerCase()}%` });
      }
      query.orderBy('roles.isDisabled', 'ASC').addOrderBy('roles.name', 'ASC');
      // Execute queries in parallel: one for data and one for total count
      const [data, total] = await Promise.all([
        query.skip(pageIndexNumber * pageSizeNumber)
          .take(pageSizeNumber)
          .getMany(),

        query.getCount(),
      ]);

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
      // Find the role by ID
      const role = await this.rolesRepository.findOne({ where: { id } });

      if (!role) {
        console.error(`Role with ID ${id} not found.`);
        return null;
      }
      // Set the role's status based on the isDisabled flag
      role.isDisabled = isDisabled;
      // Save the updated role
      return await this.rolesRepository.save(role);
    } catch (error) {
      console.error('Error updating role status:', error);
      throw new Error('Error updating role status');
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
}
