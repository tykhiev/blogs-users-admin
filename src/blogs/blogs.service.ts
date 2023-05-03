import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Blog, Prisma } from '@prisma/client';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.BlogCreateInput): Promise<Blog> {
    return this.prisma.blog.create({ data });
  }

  async findAll(): Promise<Blog[]> {
    return this.prisma.blog.findMany();
  }
}
