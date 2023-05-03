import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(dto: AuthDto) {
    const { username, password } = dto;
    const foundUser = await this.prisma.user.findUnique({
      where: { username },
    });
    if (foundUser) {
      throw new BadRequestException('Username already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    await this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    return { message: 'user created' };
  }

  async signIn(dto: AuthDto) {
    const { username, password } = dto;
    const foundUser = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!foundUser) {
      throw new BadRequestException('User does not exist');
    }
  }

  async signOut() {
    return { message: 'sign out' };
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return hashedPassword;
  }
}
