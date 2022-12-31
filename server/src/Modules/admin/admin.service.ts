import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Database/User.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs/promises'
import * as path from 'path';
import * as BPromise from 'bluebird'

@Injectable()
export class AdminService {
  constructor(    
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ){}

  async findAll() {
    let data = await this.usersRepository.find()

    const res = await BPromise.resolve(data).map(async (each) => {
      const { picName, name, userId } = each
      if(picName) {
        const data = await fs.readFile(path.join(process.cwd(), `/public/${picName}.png`))
        return {
          name,
          userId,
          data,
        }
      }
    })
    return res
  }
}
