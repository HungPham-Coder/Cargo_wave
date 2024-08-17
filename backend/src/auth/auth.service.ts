import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserRequest } from 'src/users/create-user-request.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    saltOrRounds: number = 10;
    constructor (
        private userService: UsersService,
        private jwtService: JwtService
    ){}


    async signIn (username: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(username);
        const isMatch = await bcrypt.compare(pass, user?.password);
        
        if (!isMatch){
            throw new UnauthorizedException("User not matching");
        }
        const payload = {sub: user.userId, username: user.username};
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
        // const {password, ...result} = user;
        // return result;
    }

    async signUp (payload: CreateUserRequest ){
        const hashPass = await bcrypt.hash(payload.password, this.saltOrRounds)

        let data = {
            ...payload,
            password: hashPass
        }

        const user = this.userService.create(data);
        return user;
    }


}
