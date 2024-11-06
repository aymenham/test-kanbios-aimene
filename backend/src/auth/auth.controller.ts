import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './config/guard/local-auth.guard';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthSwaggerDocs } from 'src/swagger/auth-swagger';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @AuthSwaggerDocs.login
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
