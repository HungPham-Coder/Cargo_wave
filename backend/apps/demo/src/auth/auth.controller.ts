import { Post, Body, Controller, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO, LoginDTO } from '../users/create-user-request.dto';
import { MessagePattern } from '@nestjs/microservices';
// import { CreateUserDTO, LoginDTO } from 'src/users/create-user-request.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    
    // @Post('login')
    @MessagePattern('hero.auth.login')
    signIn(@Body() signInDto: LoginDTO) {
        // Record<K, T> K ở đây là user name còn value là password với bất kì kiểu nào
        // const { email, password } = signInDto;
        // return this.authService.signIn(email, password);
        return this.authService.signIn(signInDto);
    }

    // @Post('register')
    @MessagePattern('hero.auth.register')
    signUp(@Body(ValidationPipe) signUpDto: CreateUserDTO) {
        return this.authService.signUp(signUpDto)
    }
}