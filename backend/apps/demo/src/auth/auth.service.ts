import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';
import { roles, userStatus } from '../constants/enum';
import { CreateUserDTO, LoginDTO } from '../users/users.dto/create-user-request.dto';
import { Permission } from '../entities/permission.entity';
import { config } from 'dotenv';
import { lastValueFrom } from 'rxjs';
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

            const accessToken = this.jwtService.sign(payload, {
                expiresIn: '5s',
            });
            const refreshToken = this.jwtService.sign(payload, {
                expiresIn: '7d',
            });
            const accessExpire = new Date(Date.now() + 5 * 1000); // 1 day from now
            const refreshExpire = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            
            const uniquePermissions = this.getUniquePermissions(user.roles || []);
            const { password: _, roles: __,...userInfo } = user;

            return {
                accessToken,
                refreshToken,
                accessExpire: accessExpire.toISOString(), // Return in ISO format
                refreshExpire: refreshExpire.toISOString(),
                user: userInfo,
                permissions: uniquePermissions
            }
        } catch (error) {
            console.error('Error during SignIn:', error.message);
            throw error;
        }
    }

    private getUniquePermissions(roles: any[]): Permission[] {
        const permissionsMap = new Map<string, Permission>();

        roles.forEach((role) => {
            if (!role.isDisabled) {
                role.permissions.forEach((permission: Permission) => {
                    if (!permissionsMap.has(permission.name)) {
                        permissionsMap.set(permission.name, permission);
                    }
                });
            }
        });

        return Array.from(permissionsMap.values());
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
            const user = await this.userService.createUser(data);
            return user;
        } catch (error) {
            console.error('Error during SignUp:', error.message);
            throw error;
        }
    }

    async refreshToken(refreshToken: string): Promise<any> {
        try {
            // Verify the refresh token
            const decoded = this.jwtService.verify(refreshToken);
            if (!decoded) {
                throw new UnauthorizedException("Invalid refresh token!");
            }

            // Fetch the user based on the decoded payload
            const user = await this.userService.findById(decoded.sub); // Assuming you have a findById method
            if (!user) {
                throw new UnauthorizedException("User not found!");
            }

            // Create new access token
            const payload = { sub: user.id, email: user.email };
            const newAccessToken = this.jwtService.sign(payload, {
                expiresIn: '1d',
            });
            const expirationTime = new Date();
            expirationTime.setDate(expirationTime.getDate() + 1);

            return {
                accessToken: newAccessToken,
                accessExpire: expirationTime.toISOString(),
            };
        } catch (error) {
            console.error('Error during refreshToken:', error.message);
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
            // const apiUrl = `http://localhost:3001/auth/confirm?token=${accessToken}`
            // if (!res.ok) {
            //     throw new Error('Network response was not ok');
            // }
            // const response = await lastValueFrom(this.httpService.get(apiUrl));
            // const data = response.data; // Lấy dữ liệu từ phản hồi

            // // Xử lý dữ liệu từ phản hồi
            // if (data.success) {
            //     await this.handleUserConfirmation(data.success, req, existingUser);
            //     return {
            //         message: 'User information from google',
            //         user: req.user
            //     }
            // } else {
            //     // Xử lý thất bại
            //     return 'Xác nhận thất bại.';
            // }

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
    
        user.password = password;
        // delete user[0].verify_token; // remove the token after the password is updated
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
