import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserType } from 'src/user/dto/user.dto';

const EXPIRE_TIME = 60 * 30 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(userBody: Required<Omit<UserType, 'name'>>) {
    const user = await this.userService.findUserByEmail(userBody.email);
    await this.checkPassword(userBody.password, user.password);
    const payload = _.omit(user, 'password');
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '30s',
      secret: process.env.SECRET,
    });
    const refresh = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret: process.env.REFRESH,
    });
    return {
      token,
      refresh,
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }

  async refresh(user) {
    const payload = _.omit(user, ['iat', 'exp']);

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      secret: process.env.SECRET,
    });
    const refresh = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret: process.env.REFRESH,
    });
    return {
      token,
      refresh,
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }

  async checkPassword(password: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);
    if (!isMatch) {
      throw new UnauthorizedException('passwords not matches');
    }

    return isMatch;
  }
}