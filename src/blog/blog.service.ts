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

  async getAllBlogs(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const [data, totalCount] = await this.prisma.$transaction([
      this.prisma.blog.findMany({
        include: {
          author: {
            select: {
              username: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take,
      }),
      this.prisma.blog.count(),
    ]);
    return { data, totalCount };
  }

  async getUserBlogs(id: string, page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const [data, totalCount] = await this.prisma.$transaction([
      this.prisma.blog.findMany({
        where: { authorId: id },
        include: {
          author: {
            select: {
              username: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take,
      }),
      this.prisma.blog.count({
        where: { authorId: id },
      }),
    ]);

    return { data, totalCount };
  }

  async getBlogById(id: string) {
    const blog = await this.prisma.blog.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
    });
    if (!blog) {
      throw new Error(`Blog post with id ${id} not found`);
    }
    return blog;
  }

  updateBlogById(id: string, updateBlogDto: UpdateBlogDto) {
    return this.prisma.blog.update({
      where: { id },
      data: updateBlogDto,
    });
  }

  deleteBlogById(id: string) {
    return this.prisma.blog.delete({
      where: { id },
    });
  }
}
