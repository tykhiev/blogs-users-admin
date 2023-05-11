/* eslint-disable prettier/prettier */
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Request } from 'express';
import { Blog } from 'src/blog/entities/blog.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  private readonly blogs: Blog[] = [];

  async getMyUser(id: string, req: Request) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const decodedUser = req.user as { id: string; username: string };

    if (decodedUser.id !== user.id) {
      throw new ForbiddenException('User not found');
    }

    delete user.password;

    return { user };
  }

  async getUsers() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
      },
    });
  }
}
