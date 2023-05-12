import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Query,
  ParseIntPipe,
  Req,
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
    const blog = await this.blogService.createBlogPost(dto, userId);
    return { message: 'Blog post created', data: blog };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUserBlogs(
    @Param('id') @Query('page', ParseIntPipe) page = 1,
    @Query('pageSize', ParseIntPipe) pageSize = 5,
    @Req() req: any,
  ) {
    return this.blogService.getUserBlogs(req.user.id, page, pageSize);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getMyUser(
    @Query('page', ParseIntPipe) page = 1,
    @Query('pageSize', ParseIntPipe) pageSize = 5,
  ) {
    return this.blogService.getAllBlogs(page, pageSize);
  }
}
