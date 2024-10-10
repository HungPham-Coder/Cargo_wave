import { Body, Controller, HttpCode, HttpStatus, Request, ValidationPipe, UseGuards, Get, Post, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO, LoginDTO } from '../users/create-user-request.dto';
import { MessagePattern } from '@nestjs/microservices';
import { GoogleOAuthGuard } from './google_oauth/google_oauth.guard';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { roles } from '../constants/enum';
// import { CreateUserDTO, LoginDTO } from 'src/users/create-user-request.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @HttpCode(HttpStatus.OK)
    @Post('login')
    // @MessagePattern('hero.auth.login')
    signIn(@Body() signInDto: LoginDTO) {
        // Record<K, T> K ở đây là user name còn value là password với bất kì kiểu nào
        // const { email, password } = signInDto;
        // return this.authService.signIn(email, password);
        return this.authService.signIn(signInDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    // @MessagePattern('hero.auth.register')
    signUp(@Body(ValidationPipe) signUpDto: CreateUserDTO) {
        return this.authService.signUp(signUpDto)
    }

    //Laấy thông tin user từ google, có accesstoken
    @Get()
    @UseGuards(GoogleOAuthGuard)
    async googleAuth(@Request() req) { }

    @Get('google-redirect')
    @UseGuards(GoogleOAuthGuard)
    googleAuthRedirect(@Request() req) {
        return this.authService.googleLogin(req);
    }

    @Post('reset-password/:id/:token')
    resetPassord(
        @Param('id') id: string,
        @Param('token') token: string,
        @Body() resetPasswordDto: ResetPasswordDto,
    ) {
        return this.authService.resetPassord(id, token, resetPasswordDto);
    }

    // @Roles(roles.ADMIN)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('reset-password/:id')
    resetPassordEmail(@Param('id') id: string) {
        return this.authService.resetPasswordEmail(id);
    }

    @Post('forgot-password')
    forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        return this.authService.forgotPassword(forgotPasswordDto);
    }


}