import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @MessagePattern('hero.user.findAll')
  async findAll() {
    console.log('Received request for findAll');
    return this.userService.findAll();
  }

  @MessagePattern("hero.user.removeUser")
  async removeUser(@Payload() id: number) {
    return await this.userService.removeUser(id);
  }

  @MessagePattern("hero.user.findByEmail")
  async findByEmail(@Payload() email: string) {
    return await this.userService.findByEmail(email);
  }
}
