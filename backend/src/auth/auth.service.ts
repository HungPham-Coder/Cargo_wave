import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserRequest } from 'src/users/create-user-request.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor (
        private userService: UsersService,
        private jwtService: JwtService
    ){
        const crypto = require ('crypto');
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
          });

    }

    encryptPass (pass: string){
        const crypto = require ('crypto');
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
          });

        const encryptedPassword = crypto.publicEncrypt(publicKey, Buffer.from(pass));
        console.log (encryptedPassword);
        return encryptedPassword.toString('base64');
    }

    async signIn (username: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(username);
        
        if (user ?.password !==  this.encryptPass(pass)){
            throw new UnauthorizedException();
        }
        const payload = {sub: user.userId, username: user.username};
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
        // const {password, ...result} = user;
        // return result;
    }

    async register (user: CreateUserRequest ){
        user.password = this.encryptPass(user.password);
        this.userService.add(user);
    }


}
