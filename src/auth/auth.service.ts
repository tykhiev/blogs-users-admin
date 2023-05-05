/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from '../utils/constants';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

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

  async signIn(dto: AuthDto, req: Request, res: Response) {
    const { username, password } = dto;
    const foundUser = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!foundUser) {
      throw new BadRequestException('User does not exist');
    }

    const isMarched = await this.comparePassword({
      password,
      hash: foundUser.password,
    });
    if (!isMarched) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = await this.signToken({
      id: foundUser.id,
      username: foundUser.username,
    });

    if (!token) {
      throw new ForbiddenException('Token not found');
    }

    res.cookie('token', token);

    return res.send({ message: 'signed in successfully' });
  }

  async signOut(req: Request, res: Response) {
    res.clearCookie('token');
    return res.send({ message: 'signed out successfully' });
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePassword(args: { password: string; hash: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  async signToken(args: { id: string; username: string }) {
    const payload = args;
    return this.jwt.sign(payload, { secret: jwtSecret });
  }
}
