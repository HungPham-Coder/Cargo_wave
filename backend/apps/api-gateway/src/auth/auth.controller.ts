import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO, LoginDTO } from './dto/create-user-request.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly auth: AuthService){}

    @Post ('register')
    signUp(@Body() creatUserDto: CreateUserDTO){
      return  this.auth.signUp (creatUserDto);
    }

    @Post ('login')
    signIn(@Body() user: LoginDTO){
      return this.auth.signIn(user);
    }

    
}
