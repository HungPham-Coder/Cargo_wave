import { IsArray, IsNumber, IsString } from 'class-validator';

export class AssignPermissionDTO {
  @IsString()
  roleId: string;

  @IsArray()
  permissionIDs: string[];
}