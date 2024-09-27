import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly auth: AuthService){}
    @Post('register')
    signUp(@Body ){
        this.auth.signUp();
    }
}
