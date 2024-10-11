import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { CreateUserDTO, PaginationDTO } from './users.dto/create-user-request.dto';
import { AssignRoleDTO } from './users.dto/assign-role-dto';

export type Users = any;
export type Roles = any;

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<Users>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Roles>,
  ) { }

  async create(userDto: CreateUserDTO): Promise<Users> {
    return await this.usersRepository.save(userDto);
  }

  async findAll(): Promise<Users[]> {
    const users = await this.usersRepository.find({ relations: ['roles'] });
    return users; // This should return an array of users
  }

  async findAllWithPaging(paginationDTO: PaginationDTO): Promise<{ data: User[], total: number }> {
    const { search = '', pageIndex = 0, pageSize = 10 } = paginationDTO;

    const pageIndexNumber = Number(pageIndex);
    const pageSizeNumber = Number(pageSize);

    try {
      const query = this.usersRepository.createQueryBuilder('users')
        .leftJoinAndSelect('users.roles', 'roles');

      if (search) {
        query.where(
          'LOWER(users.name) LIKE LOWER(:search) ' +
          'OR LOWER(users.email) LIKE LOWER(:search) ' +
          'OR LOWER(users.phone_number::text) LIKE LOWER(:search)',
          { search: `%${search.toLowerCase()}%` }
        );
      }

      query.orderBy('users.status', 'ASC').addOrderBy('users.name', 'ASC');

      const [data, total] = await Promise.all([
        query.skip(pageIndexNumber * pageSizeNumber)
          .take(pageSizeNumber)
          .getMany(),
        query.getCount(),
      ]);

      return { data, total };
    } catch (error) {
      console.error('Error finding users: ', error);
      throw new Error('Error finding users');
    }
  }

  async findByEmail(email: string): Promise<Users | null> {
    return this.usersRepository.findOne({ where: { email }, relations: ['roles'] });
  }

  async findById(userId: string): Promise<Users | null> {
    try {
      const user = await this.usersRepository.createQueryBuilder('user')
        .leftJoinAndSelect('user.roles', 'roles')
        .where('user.id = :userId', { userId })
        .getOne();

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      return user;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw new Error('Error finding user');
    }
  }

  async update(userId: string, userDto: CreateUserDTO): Promise<Users> {
    await this.usersRepository.update(userId, userDto);
    return this.findById(userId); // Return the updated user
  }
  async banUser(userId: string): Promise<Users> {
    const user = await this.findById(userId);
    user.status = 2; // Assuming 0 is for banned users
    return this.usersRepository.save(user);

  }
  async unbanUser(userId: string): Promise<Users> {
    const user = await this.findById(userId);
    user.status = 1; // Assuming 1 is for active users
    return this.usersRepository.save(user);
  }

  async assignRole(assignRoleDTO: AssignRoleDTO): Promise<User> {
    const { userId, roleIds } = assignRoleDTO;

    const user = await this.rolesRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    if (!user) {
      throw new Error('Role not found');
    }
    const rolesToAdd = await this.rolesRepository.findBy({
      id: In(roleIds),
    });

    if (!user) {
      throw new NotFoundException(`Role with ID ${roleIds} not found`);
    }

    const existingRoleIDs = new Set(user.roles.map((p: { id: any; }) => p.id));
    // Add new permissions
    const newRoles = rolesToAdd.filter(p => !existingRoleIDs.has(p.id));
    user.roles = [...user.roles, ...newRoles];
    // Remove permissions that are not included in the new list
    user.roles = user.roles.filter(p => roleIds.includes(p.id) || newRoles.includes(p));
    // Save the updated role
    return this.usersRepository.save(user); // Save the user with the new role
  }

  async getRolesByUserId(userId: string): Promise<Role[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['roles'], // Load permissions relation
    });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    return user.roles; // Return the assigned permissions
  }
  
  // Method to get permissions not assigned to a role by ID
  async getRolesNotAssignedByUserId(userId: string): Promise<Role[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['roles'], // Load permissions relation
    });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    // Fetch all permissions from the database
    const allRoles = await this.rolesRepository.find();
  
    // Filter out the permissions that are already assigned to the role
    const assignedRoleIds = new Set(user.roles.map(role => role.id));
    const notAssignedRoles = allRoles.filter(role => !assignedRoleIds.has(role.id));
  
    return notAssignedRoles; // Return the not assigned permissions
  }
}