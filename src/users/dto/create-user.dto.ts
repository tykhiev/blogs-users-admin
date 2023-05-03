import { User } from '@prisma/client';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto
  implements
    Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'name' | 'adminId' | 'email'>
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
