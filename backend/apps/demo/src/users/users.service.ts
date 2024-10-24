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

  async updateToken(id: string, token: string): Promise<Users> {
    return await this.usersRepository.createQueryBuilder('user')
      .update() // Giả sử User là entity của bạn
      .set({ verify_token: token }) // Cập nhật mật khẩu và xóa verify_token
      .where("id = :id", { id: id }) // Cần phải có điều kiện để xác định người dùng
      .execute();
  }
  async updatePass(id: string, password: string): Promise<Users> {
    // const user = await this.findById(id);
    return await this.usersRepository.createQueryBuilder('user')
      .update() // Giả sử User là entity của bạn
      .set({ password: password, verify_token: null }) // Cập nhật mật khẩu và xóa verify_token
      .where("id = :id", { id: id }) // Cần phải có điều kiện để xác định người dùng
      .execute();
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

  async findById(id: string): Promise<Users | null> {
    try {
      const user = await this.usersRepository.createQueryBuilder('user')
        .leftJoinAndSelect('user.roles', 'roles')
        .leftJoinAndSelect('roles.permissions', 'permissions')
        .where('user.id = :id', { id })
        .getOne();

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw new Error('Error finding user');
    }
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

    const rolesToAdd = await this.rolesRepository.find({
      where: { id: In(roleIds) },
      relations: ['permissions'],
    });

    const existingRoleIDs = new Set(user.roles.map((p: { id: any; }) => p.id));

    const newRoles = rolesToAdd.filter((p) => !existingRoleIDs.has(p.id));
    user.roles = [...user.roles, ...newRoles];
    user.roles = user.roles.filter((p: { id: string; }) => roleIds.includes(p.id) || newRoles.includes(p));

    const uniquePermissions = new Set<Permission>();

    newRoles.forEach(role => {
      if (role.permissions) {
        if (Array.isArray(role.permissions)) {
          for (const permission of role.permissions) {
            uniquePermissions.add(permission);
          }
        } else {
          console.error(`Role ${role.id} has permissions that are not iterable.`);
        }
      } else {
        console.warn(`Role ${role.id} has no permissions defined.`);
      }
    });

    console.log("uniquePermissions", uniquePermissions)

    this.socket.emit(`message_${userId}`, JSON.stringify({
      userId: userId,
      roleIds: roleIds,
      permissions: Array.from(uniquePermissions),
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