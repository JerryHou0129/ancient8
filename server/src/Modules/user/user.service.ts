import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Database/User.entity';
import { Repository } from 'typeorm';
import { CreateUserBdoy } from './dto/create-user.dto';
import * as fs from 'fs'
import * as path from 'path';

@Injectable()
export class UserService {
  constructor(    
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ){}

  create(name: string, id: string, pic: Express.Multer.File): Promise<User> {
    const user = new User();
    user.name = name
    user.userId = id
    user.picName = `${name}+${id}`

    fs.writeFile(path.join(process.cwd(), `/public/${name}+${id}.png`), pic.buffer, err => {
      if(err) {
        console.log(err)
      }
    })

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
