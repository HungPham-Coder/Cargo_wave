import userError from "apps/demo/src/constants/errorCode/userError";
import { RoleDTO } from "apps/demo/src/users/create-user-request.dto";
import { IsNotEmpty, IsEmail, IsDate } from "class-validator";

export class CreateUserDTO{
    @IsNotEmpty(userError.US_01)
    name: string;

    @IsNotEmpty(userError.US_02)
    phone_number: number;

    @IsNotEmpty(userError.US_03)
    @IsEmail({}, { message: userError.US_04.message })
    email: string;

    // @IsNotEmpty(userError.US_05)
    // @IsDate(userError.US_06)
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