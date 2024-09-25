import { IsArray, IsString } from 'class-validator';

export class UpdatePermissionsDTO {
  @IsArray()
  @IsString({ each: true })
  permissions: string[];
}