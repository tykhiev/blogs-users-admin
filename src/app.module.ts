import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { AdminService } from './admin/admin.service';
import { PrismaService } from './prisma.service';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [UsersModule, AdminModule, AuthModule, BlogModule],
  controllers: [AppController],
  providers: [AppService, UsersService, AdminService, PrismaService],
})
export class AppModule {}
