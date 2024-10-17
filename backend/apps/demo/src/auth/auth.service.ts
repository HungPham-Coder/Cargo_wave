import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';
import { roles, userStatus } from '../constants/enum';
import { CreateUserDTO, LoginDTO } from '../users/users.dto/create-user-request.dto';
import { Permission } from '../entities/permission.entity';

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
            const user = await this.userService.create(data);
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
}