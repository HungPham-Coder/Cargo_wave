import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from '../users/create-user-request.dto';
import { roles, userStatus } from '../constants/enum';



@Injectable()
export class AuthService {

    saltOrRounds: number = 10;
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private roleService: RolesService
    ) { }


    async signIn(email: string, pass: string): Promise<any> {
        try {
            if(!email || !pass){
                throw new UnauthorizedException("Email or password empty!");
            }
            const user = await this.userService.findByEmail(email);
            const isMatch = await bcrypt.compare(pass, user?.password);

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
            const user = await this.userService.create(data);
            return user;
        } catch (error) {
            console.error('Error during SignUp:', error.message);
            throw error;
        }
    }
}