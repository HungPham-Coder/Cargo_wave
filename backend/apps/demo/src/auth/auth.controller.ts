import { Post, Body, Controller, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO, LoginDTO } from '../users/create-user-request.dto';
// import { CreateUserDTO, LoginDTO } from 'src/users/create-user-request.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: LoginDTO) {
        // Record<K, T> K ở đây là user name còn value là password với bất kì kiểu nào
        const { email, password } = signInDto;
        return this.authService.signIn(email, password);
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    signUp(@Body(ValidationPipe) signUpDto: CreateUserDTO) {
        return this.authService.signUp(signUpDto)
    }
}