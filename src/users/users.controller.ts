/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getMyUser(@Param() params: { id: string }, @Req() req) {
    if (params.id === 'blogs') {
      return this.usersService.getAllBlogs( );
    }
    return this.usersService.getMyUser(params.id, req);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Post(':userId/create-blog')
  createBlogPost(
    @Param('userId') userId: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.usersService.createBlogPost(userId, title, content);
  }

  @Get(':userId/blogs')
  getUserBlogs(@Param('userId') userId: string) {
    return this.usersService.getUserBlogs(userId);
  }
}
