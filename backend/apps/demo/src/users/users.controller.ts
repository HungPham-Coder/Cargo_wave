import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Patch, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { User } from '../entities/user.entity';
import { CreateUserDTO, PaginationDTO } from './users.dto/create-user-request.dto';
import { AssignRoleDTO } from './users.dto/assign-role-dto';
import { Role } from '../entities/role.entity';
import { UpdateUserDTO } from './users.dto/update-route-request.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  // @MessagePattern('hero.user.findAll')
  @HttpCode(HttpStatus.OK)
  @Get('findAll')
  async findAll() {
    console.log('Received request for findAll');
    return this.userService.findAll();
  }

  //Get all data of permissions with paging
  @HttpCode(HttpStatus.OK)
  @Get('findAllWithPaging')
  async findAllWithPaging(@Query() paginationDTO: PaginationDTO): Promise<{ data: User[], total: number }> {
    return this.userService.findAllWithPaging(paginationDTO);
  }

  // @MessagePattern("hero.user.createUser")
  @HttpCode(HttpStatus.OK)
  @Get('create')
  create(userDto: CreateUserDTO) {
    return this.userService.create(userDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('findById/:id')
  async findById(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @MessagePattern("hero.user.findByEmail")
  findByEmail(email: string) {
    return this.userService.findByEmail(email);
  }

  @Put('updateUser/:id')
  async updateUser(@Param('id') id: string, @Body() userDto: UpdateUserDTO) {
    return this.userService.update(id, userDto);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('assignRoles')
  async assignRole(@Body() assignRoleDTO: AssignRoleDTO) {
    try {
      const body = this.userService.assignRole(assignRoleDTO);
      if (!body) {
        throw new HttpException(`Assign permissions not found`, HttpStatus.NOT_FOUND);
      }
      return body;

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Patch('updateUserStatus/:id/status')
  async updateUserStatus(
    @Param('id') id: string,
    @Body('status') status: number
  ): Promise<User> {
    return this.userService.updateUserStatus(id, status);
  }

  @HttpCode(HttpStatus.OK)
  @Get('getRolesByUserId/:id')
  async getPermissions(@Param('id') id: string): Promise<Role[]> {
    return this.userService.getRolesByUserId(id);
  }

  // Endpoint to get permissions not assigned to a role by ID
  @HttpCode(HttpStatus.OK)
  @Get('getRolesNotAssignedByUserId/:id')
  async getPermissionsNotAssigned(@Param('id') id: string): Promise<Role[]> {
    return this.userService.getRolesNotAssignedByUserId(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('getTotalUsersByRole')
  async getTotalUsersByRole() {
    try {
      const result = await this.userService.getTotalUsersByRole();
      return {
        data: result,
      };
    } catch (error) {
      console.error('Error getting total users by role:', error);
      return {
        success: false,
        message: 'Error getting total users by role',
      };
    }
  }

}
