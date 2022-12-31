import { Body, ConsoleLogger, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserBdoy } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor('pic'))
  async create(@Body() body: CreateUserBdoy, @UploadedFile() pic: Express.Multer.File) {
    const { name, id } = body
    return this.userService.create(name, id, pic)
  }

}
