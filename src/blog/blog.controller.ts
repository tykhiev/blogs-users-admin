import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-blog')
  async createBlogPost(@Request() req, @Body() dto: CreateBlogDto) {
    const userId = req.user.id;
    const { title, content } = dto;
    const blog = await this.blogService.createBlogPost(dto, userId);
    return { message: 'Blog post created', data: blog };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/blogs')
  getUserBlogs(@Param('userId') userId: string) {
    return this.blogService.getUserBlogs(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getMyUser(@Param() params: { id: string }) {
    return this.blogService.getAllBlogs();
  }
}
