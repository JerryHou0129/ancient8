import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AdminService } from './admin.service';

@Controller()
export class AdminController {
  constructor(private adminService: AdminService, private authService: AuthService  ) {}

  @Post('auth/login')
  async login(@Body() body) {
    return this.authService.login(body);
  }

  @Get()
  findAll() {
    
    return this.adminService.findAll();
  }
}
