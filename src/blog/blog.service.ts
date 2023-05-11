import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async createBlogPost(dto: CreateBlogDto, userId: string) {
    const { title, content } = dto;
    const blog = await this.prisma.blog.create({
      data: {
        title,
        content,
        author: { connect: { id: userId } },
      },
    });
    return blog;
  }

  async getAllBlogs() {
    return await this.prisma.blog.findMany({
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
    });
  }

  async getUserBlogs(userId: string) {
    return await this.prisma.blog.findMany({
      where: { authorId: userId },
    });
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
