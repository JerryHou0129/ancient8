import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { tryCatch } from 'src/Common/try-catch';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    if (username === 'root' && password === 'root') {
      return {
        username,
        password
      }
    }
    return null;
  }

  async login(body) {
    const { username, password } = body
    if(username !== 'root' || password !== 'root') throw new UnauthorizedException();
    const payload = { username, password }
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async decode(token) {
    const newToken = token.replace("Bearer ","");
    try {
      const decodetoken: any = this.jwtService.decode(newToken)
      this.jwtService.verify(newToken)
      const { username, password } = decodetoken
      if(username !== 'root' || password !== 'root') throw new UnauthorizedException();
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}