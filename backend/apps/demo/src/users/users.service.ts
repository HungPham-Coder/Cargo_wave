import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { CreateUserDTO, PaginationDTO } from './users.dto/create-user-request.dto';
import { AssignRoleDTO } from './users.dto/assign-role-dto';
import { UpdateUserDTO } from './users.dto/update-route-request.dto';
import { SubscribeMessage, WebSocketServer, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { Permission } from '../entities/permission.entity';

export type Users = any;
export type Roles = any;
export type Permissions = any;

@Injectable()
@WebSocketGateway({
  cors: {
    origin: "*"
  }
})

export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<Users>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Roles>,
  ) { }

  @WebSocketServer()
  socket: Socket

  async createUser(userDto: CreateUserDTO): Promise<Users> {
    return await this.usersRepository.save(userDto);
  }

  async create(name: string, email: string): Promise<Users> {
    // const user =  await this.usersRepository.create ({name, email});
    return await this.usersRepository.save({ name, email });
  }
  async save(userDto: CreateUserDTO): Promise<Users> {
    // const user = await this.usersRepository.create(userDto);
    // userDto.role = userDto.roleID
    return await this.usersRepository.save(userDto);
  }

  async findAll(): Promise<Users[]> {
    const users = await this.usersRepository.find({ relations: ['roles'] });
    return users; // This should return an array of users
  }

  async findAllWithPaging(paginationDTO: PaginationDTO): Promise<{ data: User[], total: number }> {
    const { search = '', pageIndex = 0, pageSize = 10, statusNumb } = paginationDTO;

    const pageIndexNumber = Number(pageIndex);
    const pageSizeNumber = Number(pageSize);

    try {
      const query = this.usersRepository.createQueryBuilder('users')
        .leftJoinAndSelect('users.roles', 'roles');

      if (search) {
        query.where(
          'LOWER(users.name) LIKE LOWER(:search) ',
          { search: `%${search.toLowerCase()}%` }
        );
      }

      if (statusNumb !== undefined) {
        query.andWhere('users.status = :statusNumb', { statusNumb: Number(statusNumb) });
      }

      const total = await query.getCount();
      const effectivePageIndex = Math.min(pageIndexNumber, Math.floor(total / pageSizeNumber));

      const data = await
        query.skip(effectivePageIndex * pageSizeNumber)
          .take(pageSizeNumber)
          .orderBy('users.status', 'ASC')
          .getMany();

      return { data, total };
    } catch (error) {
      console.error('Error finding users: ', error);
      throw new Error('Error finding users');
    }
  }

  async findByEmail(email: string): Promise<Users | null> {
    return this.usersRepository.findOne({ where: { email }, relations: ['roles', 'roles.permissions'], });
  }

  async getUserWithRolesAndUniquePermissions(userId: string): Promise<{ user: User, uniquePermissions: Permission[] }> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['roles', 'roles.permissions'], // Load roles and permissions
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Filter out disabled roles and extract their names
    // const activeRoles = user.roles.filter((role: { isDisabled: any; }) => !role.isDisabled);

    // Get unique permissions from the user's active roles
    // const uniquePermissions = this.getUniquePermissions(activeRoles);

    return user // Return the complete user information
  }

  // Existing getUniquePermissions method
  // private getUniquePermissions(roles: any[]): Permission[] {
  //   const permissionsMap = new Map<string, Permission>();

  //   roles.forEach((role) => {
  //     role.permissions.forEach((permission: Permission) => {
  //       if (!permissionsMap.has(permission.name)) {
  //         permissionsMap.set(permission.name, permission);
  //       }
  //     });
  //   });

  //   return Array.from(permissionsMap.values());
  // }

  // Example usage of findById modified to include user information, role names, and unique permissions
  async findById(userId: string): Promise<any> {
    return this.getUserWithRolesAndUniquePermissions(userId);
  }

  async update(id: string, userDto: UpdateUserDTO): Promise<Users> {
    console.log("Update User DTO: ", userDto); // Log incoming data
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.usersRepository.update(id, userDto);
    return this.findById(id); // Return the updated user
  }
  async updateUserStatus(id: string, status: number): Promise<Users> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    user.status = status;
    return this.usersRepository.save(user);
  }

  @SubscribeMessage("message")
  async assignRole(assignRoleDTO: AssignRoleDTO): Promise<User> {
    const { userId, roleIds } = assignRoleDTO;

    // Find the user using the usersRepository instead of rolesRepository
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['roles', 'roles.permissions'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    const rolesToAdd = await this.rolesRepository.findBy({
      id: In(roleIds),
    });

    const existingRoleIDs = new Set(user.roles.map((p: { id: any; }) => p.id));

    const newRoles = rolesToAdd.filter((p) => !existingRoleIDs.has(p.id));
    user.roles = [...user.roles, ...newRoles];
    user.roles = user.roles.filter((p: { id: string; }) => roleIds.includes(p.id) || newRoles.includes(p));

    const allPermissions = user.roles.flatMap(role => role.permissions || []);

    const uniquePermissions = Array.from(new Set(allPermissions.map(permission => permission.id)))
      .map(id => allPermissions.find(permission => permission.id === id))
      .filter(permission => permission !== undefined); 


    this.socket.emit(`message_${userId}`, JSON.stringify({
      userId: userId,
      roleIds: roleIds,
      permissions: uniquePermissions,
    }));

    return this.usersRepository.save(user);
  }

  async getRolesByUserId(userId: string): Promise<Role[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user.roles.filter((role: { isDisabled: any; }) => !role.isDisabled);
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
    const allRoles = await this.rolesRepository.find({
      where: { isDisabled: false },
    });

    // Filter out the permissions that are already assigned to the role
    const assignedRoleIds = new Set(user.roles.map((role: { id: any; }) => role.id));
    const notAssignedRoles = allRoles.filter(role => !assignedRoleIds.has(role.id));

    return notAssignedRoles; // Return the not assigned permissions
  }

  async getTotalUsersByRole(): Promise<{ role: string; total: number }[]> {
    try {
      const roles = await this.rolesRepository.find({
        where: { isDisabled: false }, // Get only roles that are not disabled
      });

      const totalUsersByRole = await Promise.all(
        roles.map(async (role) => {
          const total = await this.usersRepository.count({
            relations: ['roles'],
            where: {
              status: 1, // Only count active users
              roles: {
                id: role.id, // Filter by role id
              },
            },
          });
          return { role: role.name, total }; // Return role name and total count
        }),
      );

      return totalUsersByRole.filter((result) => result.total > 0); // Optionally filter out roles with zero users
    } catch (error) {
      console.error('Error getting total users by role:', error);
      throw new Error('Error getting total users by role');
    }
  }
}