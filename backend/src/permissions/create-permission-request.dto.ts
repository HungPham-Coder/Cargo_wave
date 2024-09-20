import { IsString } from "class-validator";

export class CreatePermissionDTO {
    @IsString({ each: true })
    names: string[];
}