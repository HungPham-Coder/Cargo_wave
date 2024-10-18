import { IsDate, IsEmail, IsNotEmpty } from "class-validator";
import userError from "../../constants/errorCode/userError";

export class UpdateUserDTO {
    @IsNotEmpty(userError.US_01)
    name: string;

    @IsNotEmpty(userError.US_02)
    phone_number: string;

    @IsNotEmpty(userError.US_03)
    @IsEmail({}, { message: userError.US_04.message })
    email: string;

    @IsNotEmpty(userError.US_05)
    // @IsDate(userError.US_06)
    dob: Date;

    @IsNotEmpty(userError.US_07)
    gender: number

    image: string
}
