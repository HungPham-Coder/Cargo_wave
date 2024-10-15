import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';
import { CreateUserDTO, LoginDTO } from '../users/create-user-request.dto';
import { roles, userStatus } from '../constants/enum';
import { config } from 'dotenv';
import { response } from 'express';

config()

@Injectable()
export class AuthService {

    saltOrRounds: number = 10;
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private roleService: RolesService
    ) { }


    async signIn(signInDto: LoginDTO): Promise<any> {
        const { email, password } = signInDto;
        try {
            if (!email || !password) {
                throw new UnauthorizedException("Email or password empty!");
            }
            const user = await this.userService.findByEmail(email);
            const isMatch = await bcrypt.compare(password, user?.password);

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
            const hashPass = await bcrypt.hash(payload.password, this.saltOrRounds);
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
        const {name, email} = req.user;
        const existingUser = await this.userService.findByEmail (email);
        if (!req.user) {
            return 'No user from google'
        }

        if (!existingUser){
            fetch('http://localhost:3001/users/redirect', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: req.user.name,
                            email: req.user.email
                        })
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(data => console.log("Information user: ", data))
                        .catch(error => {
                            console.error('Error: ', error);
                            throw new Error('Something went wrong while fething data.')
                        })
        }else{
            console.log('User is existed');
        }
        // else {
        //     fetch('http://localhost:3001/users/redirect', {
        //         method: 'POST',
        //         headers: {
        //             'Content_Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             "name": '${req.user.name}',
        //             "email": '${req.user.email}',
        //             "phone_number": '0'
        //         })
        //     })
        //         .then(response => {
        //             if (!response.ok) {
        //                 throw new Error('Network response was not ok');
        //             }
        //             return response.json();
        //         })
        //         .then(data => console.log("Information user: ", data))
        //         .catch(error => {
        //             console.error('Error: ', error);
        //             throw new Error('Something went wrong while fething data.')
        //         })
        // }

        return {
            message: 'User information from google',
            user: req.user
        }
    }
}