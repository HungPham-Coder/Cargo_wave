import { IsArray, IsNumber, IsString } from 'class-validator';

export class AssignRoleDTO {
  @IsString()
  userId: string;

  @IsArray()
  roleIds: string[];
}