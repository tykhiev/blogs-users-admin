import { User } from '@prisma/client';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto
  implements Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'role'>
{
  @IsString()
  username: string;

  @IsString()
  @MinLength(3)
  password: string;
}
