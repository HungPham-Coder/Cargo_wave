import { Post,Body, Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { CreateUserRequest } from 'src/users/create-user-request.dto';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService){}

    @HttpCode (HttpStatus.OK)
    @Post ('login')
    signIn(@Body() signInDto: Record<string, string>){ 
                            // Record<K, T> K ở đây là user name còn value là password với bất kì kiểu nào
        return this.authService.signIn(signInDto.name, signInDto.password);
    }

    @Post ('register')
    signUp(@Body() signUpDto: CreateUserRequest){
        return this.authService.signUp(signUpDto)
    }

    
}
