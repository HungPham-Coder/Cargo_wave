import { BadRequestException, ConflictException, ForbiddenException, HttpStatus, Injectable, NotFoundException, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { RolesService } from '../roles/roles.service';
import { Users, UsersService } from '../users/users.service';
import { CreateUserDTO, LoginDTO } from '../users/create-user-request.dto';
import { roles, userStatus } from '../constants/enum';
import {customMessage} from '../constants/response/customMessage.response';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { EmailService } from '../email/email.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { User } from '../entities/user.entity';
import { encodePassword } from '../constants/utils/brypt';


@Injectable()
export class AuthService {

    saltOrRounds: number = 10;
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private roleService: RolesService,
        private emailService: EmailService
    ) { }


    async signIn(signInDto: LoginDTO): Promise<any> {
        const {email, password} = signInDto;
        try {
            if(!email || !password){
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
            const user = await this.userService.create(data);
            return user;
        } catch (error) {
            console.error('Error during SignUp:', error.message);
            throw error;
        }
    }

    googleLogin (req){
        if (!req.user){
          return 'No user from google';  
        }

        return {
            messsage: 'User information from google',
            user: req.user,
        }
    }

    async resetPasswordEmail(id: string) {
        const user = await this.userService.findById( id );
        if (!user)
          throw new NotFoundException(
            customMessage(HttpStatus.NOT_FOUND, "user doesn't exist"),
          );
        const payload = { id: user.id, email: user.email };
        const token = this.createToken(payload, user);
        const link = `${process.env.BASE_URL}/resetPassword/${user.id}/${token}`;
        const mailData = {
          to_name: user.full_name,
          to_email: user.email,
          link: link,
        };
        if (await this.emailService.sendForgotPasswordEmail(mailData)) {
          return customMessage(
            HttpStatus.OK,
            'you will shortly receive reset email link',
          );
        }
        throw new ServiceUnavailableException(
          customMessage(HttpStatus.SERVICE_UNAVAILABLE, 'Service is unavailable'),
        );
      }
    
      async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
        const email = forgotPasswordDto.email;
        const user = await this.userService.findByEmail(email) ;
        if (!user)
          throw new NotFoundException(
            customMessage(HttpStatus.NOT_FOUND, "user doesn't exist"),
          );
        const payload = { id: user.id, email: email };
        const token = this.createToken(payload, user);
        const link = `${process.env.BASE_URL}resetPassword/${user.id}/${token}`;
        const mailData = {
          to_name: user.full_name,
          to_email: email,
          link: link,
        };
        if (await this.emailService.sendForgotPasswordEmail(mailData)) {
          return customMessage(
            HttpStatus.OK,
            'if you are registered, you will shortly receive reset email link',
          );
        }
        throw new ServiceUnavailableException(
          customMessage(HttpStatus.SERVICE_UNAVAILABLE, 'Service is unavailable'),
        );
      }
    
      async resetPassord(
        id: string,
        token: string,
        resetPasswordDto: ResetPasswordDto,
      ) {
        const user = await this.userService.findById(id);
    
        try {
          const secret = JSON.stringify({
            secret: process.env.SECRET_NON_AUTH,
            updatedAt: user.updatedAt,
          });
          this.jwtService.verify(token, {
            secret,
          });
        } catch (err) {
          throw new ForbiddenException(
            customMessage(HttpStatus.FORBIDDEN, 'expired or invalid token'),
          );
        }
        if (!user)
          throw new NotFoundException(
            customMessage(HttpStatus.NOT_FOUND, "user doesn't exist"),
          );
        if (resetPasswordDto.password !== resetPasswordDto.confirm_password)
          throw new ConflictException(
            customMessage(HttpStatus.CONFLICT, "passwords don't match"),
          );

        const password = encodePassword(resetPasswordDto.password);
        const newUser = this.userService.createPassword(await password);
        if (!(await this.userService.update(id,await newUser)))
          throw new ServiceUnavailableException(
            customMessage(
              HttpStatus.SERVICE_UNAVAILABLE,
              'something went wrong, please try again later',
            ),
          );
        return customMessage(HttpStatus.OK, 'password reset successful');
      }
    
      createToken(payload: object, user: Users) {
        return this.jwtService.sign(payload, {
          secret: JSON.stringify({
            secret: process.env.SECRET_NON_AUTH,
            updatedAt: user.updatedAt,
          }),
        });
      }

}