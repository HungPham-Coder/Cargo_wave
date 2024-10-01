import { IsString } from "class-validator";

export class CreateRoleDTO {
    @IsString({ each: true })
    names: string[];
}