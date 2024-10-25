import { Post, Body, Controller, HttpCode, HttpStatus, UsePipes, ValidationPipe, UseGuards, Get, Req, Res, Query, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDTO, LoginDTO } from '../users/users.dto/create-user-request.dto';
import { GoogleOAuthGuard } from './google-oauth/google-oauth.gaurd';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { isEmailIdentifier } from 'firebase-admin/lib/auth/identifier';
import { AuthGuard } from '@nestjs/passport';
// import { CreateUserDTO, LoginDTO } from 'src/users/create-user-request.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
  
    @Get('confirm')
    async confirm(@Query('token') token: string) {
        const confirm = await this.authService.verifyAccessToken(token);
        try {
            if (confirm) {
                console.log('Token hợp lệ');
                console.log(confirm)
                this.authService.updateData(confirm.email, confirm.name, confirm.existing);
                return { "success": true };
            }


        } catch (error) {
            console.log('Token không hợp lệ:', token);
            throw new UnauthorizedException('Token không hợp lệ');
        }
    }


    @Post('login')
    // @MessagePattern('hero.auth.login')
    signIn(@Body() signInDto: LoginDTO) {
        // Record<K, T> K ở đây là user name còn value là password với bất kì kiểu nào
        // const { email, password } = signInDto;
        // return this.authService.signIn(email, password);
        return this.authService.signIn(signInDto);
    }

    @Post('register')
    // @MessagePattern('hero.auth.register')
    signUp(@Body() signUpDto: CreateUserDTO) {
        return this.authService.signUp(signUpDto)
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK) // Optional: Specify HTTP status code for successful refresh
    async refresh(@Body('refreshToken') refreshToken: string) {
        return await this.authService.refreshToken(refreshToken);
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) { }

    @Get('redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthReirect(@Req() req): Promise<any>  {
        return await this.authService.googleLogin(req);
        // const response = await this.authService.googleLogin(req)
        // // const code = await response.accessToken;
        // if (typeof response === 'string') {
        //     // Xử lý trường hợp không có người dùng
        //     console.error(response); // "No user from google"
        //     return res.status(400).send(response);
        // } else {
        //     console.log(response)
        //     // Đây là đối tượng và bạn có thể truy cập accessToken
        //     res.redirect(`http://localhost:3000?code=${response.accessToken}`);
        // }
    }

    @Post('forgotPassword')
    async forgotPassword(@Body() body: { to: string }): Promise<void> {
        return this.authService.forgotPassword(body.to);
    }

    @Post('reset-password')
    async resetPassword(
        @Query('email') email: string,
        @Body() { password }: { password: string }
    ): Promise<void> {
        return this.authService.resetPassword(email,password);
    }
}