import { Admin } from '@prisma/client';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateAdminDto
  implements Omit<Admin, 'id' | 'name' | 'createdAt' | 'updatedAt' | 'email'>
{
  @IsString()
  username: string;

  @IsOptional()
  name?: string;

  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(3)
  password: string;
}
