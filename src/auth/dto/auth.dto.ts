/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsString()
  public username: string;

  @MinLength(3)
  @IsNotEmpty()
  public password: string;
}
