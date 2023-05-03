import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { BlogsModule } from './blogs/blogs.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AdminModule, BlogsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
