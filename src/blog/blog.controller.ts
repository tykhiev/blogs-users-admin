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
  Patch,
  Delete,
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
  @Get('')
  getMyUser(
    @Query('page', ParseIntPipe) page = 1,
    @Query('pageSize', ParseIntPipe) pageSize = 5,
  ) {
    return this.blogService.getAllBlogs(page, pageSize);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/blog/:id')
  async getBlogById(@Param('id') id: string) {
    try {
      const blog = await this.blogService.getBlogById(id);
      return { blog };
    } catch (error) {
      return { message: error.message };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/blog/:id')
  async updateBlogById(@Param('id') id: string, @Body() dto: UpdateBlogDto) {
    try {
      const blog = await this.blogService.updateBlogById(id, dto);
      return { blog };
    } catch (error) {
      return { message: error.message };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/blog/:id')
  async deleteBlogById(@Param('id') id: string) {
    try {
      const blog = await this.blogService.deleteBlogById(id);
      return { blog };
    } catch (error) {
      return { message: error.message };
    }
  }
}
