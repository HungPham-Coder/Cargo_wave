import { Type } from "class-transformer";
import { IsDate, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";
import userError from "../constants/errorCode/userError";

export class LoginDTO {
    @IsNotEmpty(userError.US_03)
    @IsEmail({}, { message: userError.US_04.message })
    email: string;

    @IsNotEmpty({
        message: 'Password is required.',
        context: 'US-08',
    })
    password: string;
}

export class CreateUserDTO {
    @IsNotEmpty(userError.US_01)
    name: string;

    @IsNotEmpty(userError.US_02)
    phone_number: number;

    @IsNotEmpty(userError.US_03)
    @IsEmail({}, { message: userError.US_04.message })
    email: string;

    @IsNotEmpty(userError.US_05)
    @IsDate(userError.US_06)
    dob: Date;

    @IsNotEmpty(userError.US_07)
    gender: number

    image: string

    @IsNotEmpty(userError.US_08)
    password: string;

    @IsNotEmpty(userError.US_09)
    status: number

    roles: RoleDTO[];
}

export class RoleDTO {
    id: string;
    name: string;
}


export class PaginationDTO {
    @IsOptional()
    @IsString()
    search?: string;
  
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    pageIndex?: number = 0;
  
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    pageSize?: number = 10;
  }