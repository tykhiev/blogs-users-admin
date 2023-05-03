import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }
  @Post('signin')
  signIn(dto: AuthDto) {
    return this.authService.signIn(dto);
  }
  @Get('signout')
  signOut() {
    return this.authService.signOut();
  }
}
