import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';
import { CreateUserDTO, LoginDTO } from '../users/create-user-request.dto';
import { roles, userStatus } from '../constants/enum';
import { config } from 'dotenv';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { MailsService } from '../mails/mails.service';


config()

@Injectable()
export class AuthService {

    saltOrRounds: number = 10;
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private roleService: RolesService,
        private mailService: MailsService
    ) { }

    async verifyAccessToken(token: string): Promise<any> {
        const decode = await this.jwtService.decode(token);
        const verify = await this.jwtService.verifyAsync(token);
        if (verify) {
            const url = `https://oauth2.googleapis.com/tokeninfo?access_token=${decode.token}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Token không hợp lệ');
            }
            const data = await response.json();
            if (data){
                return decode;
            };
        }
    }
    
    private async encodePassword (password : string){
        return await bcrypt.hash(password, this.saltOrRounds);
    }

    private async decodePassword (password: string, passwordDto: string){
        return await bcrypt.compare(password, passwordDto);
    }

    async signIn(signInDto: LoginDTO): Promise<any> {
        const { email, password } = signInDto;
        try {
            if (!email || !password) {
                throw new UnauthorizedException("Email or password empty!");
            }
            const user = await this.userService.findByEmail(email);
            const isMatch = await this.decodePassword(password, user?.password);

            if (!isMatch || !user) {
                throw new UnauthorizedException("Wrong user name or password!");
            }
            const payload = { sub: user.id, email: user.email };
            return {
                access_token: await this.jwtService.signAsync(payload),
            }
        } catch (error) {
            console.error('Error during SignIn:', error.message);
            throw error;
        }
    }

    async signUp(payload: CreateUserDTO) {
        try {
            const hashPass = await this.encodePassword(payload.password);
            const role = await this.roleService.findOneByName(roles.EMPLOYEE); //get employee role

            if (!role) {
                throw new UnauthorizedException("Role does not exist!");
            }
            if (!payload.email || !payload.password) {
                throw new BadRequestException("Email and password are required!");
            }
            const existingUser = await this.userService.findByEmail(payload.email);
            if (existingUser) {
                throw new ConflictException('Email is already in use!');
            }

            const data: CreateUserDTO = {
                ...payload,
                status: userStatus.inUse,
                password: hashPass,
                roles: [role]
            };
            // console.log("role: ", role);
            console.log('SignUp data:', data);
            const user = await this.userService.save(data);
            return user;
        } catch (error) {
            console.error('Error during SignUp:', error.message);
            throw error;
        }
    }

    async googleLogin(req) {
        const { accessToken, email, name } = req.user;
        const existingUser = await this.userService.findByEmail(email);
        if (!req.user) {
            return 'No user from google'
        }
        const payload = { existing: existingUser, token: accessToken }
        const token = await this.jwtService.signAsync(payload);
        try {
            await fetch('http://localhost:3001/mails/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ to: email, token: token }) // Đối tượng
            });
            return {
                message: 'User information from google',
                user: req.user
            }

        } catch (error) {
            console.log("Waiting confirm ...");
        }
    }

    async forgotPassword(email: string): Promise<void> {
        const user = this.userService.findByEmail(email);
        if (!user) {
            throw new NotFoundException(`No user found for email: ${email}`);
        }
        await fetch('http://localhost:3001/mails/resetPasswordLink', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: email
            })
        });
    }

    async resetPassword(token: string, password: string): Promise<void> {
        const email = await this.mailService.decodeConfirmationToken(token);
        console.log(email);
        const user = await this.userService.findByEmail (email);
        if (!user) {
            throw new NotFoundException(`No user found for email: ${email}`);
        }
        console.log (user);
        const hashPass = await this.encodePassword (password);
        // user.password = hashPass;
        // delete user[0].verify_token; // remove the token after the password is updated
       
        const updatedUser = await this.userService.updateUser (user, hashPass);
        return updatedUser;
    }
    async updateData(email, name, existingUser) {
        if (!existingUser) {
            try {
                const response = await fetch('http://localhost:3001/users/redirect', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email
                    })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log("Information user: ", data);
            } catch (error) {
                console.error('Error: ', error);
                throw new Error('Something went wrong while fetching data.');
            }
        } else {
            console.log('User is existed');
        }

    }
}
