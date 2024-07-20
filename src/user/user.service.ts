import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserType, UserUpdateType } from './dto/user.dto';
import { PrismaService } from './../prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { SALT } from 'src/constants/constants';

@Injectable()
export class UserService {
  constructor(private db:PrismaService){}

  async createOld(createUserDto: Required<UserType>) : Promise<User>{
    const user = await this.db.user.create({ data : {... createUserDto}});
    return user
  }
  
  async create(
    createUserDto: Required<UserType>,
  ): Promise<Omit<User, 'password'>> {
    await this.checkUser(createUserDto.email);
    const hash = await bcrypt.hash(createUserDto.password, SALT);
    createUserDto.password = hash;
    const user = await this.db.user.create({
      data: createUserDto,
    });
    const result = _.omit(user, ['password']);
    return result;
  }
  findAll() : Promise<User[]>{
    return this.db.user.findMany({});
  }

  async findOne(id: number): Promise<User> {
    const User = await this.db.user.findFirst({
      where: {
        id: id,
      },
      // include: {
      //   categorie: {
      //     select: {
      //       title: true,
      //     },
      //   },
      // },
    });
    if (!User) {
      throw new NotFoundException('not found User');
    }
    return User;
  }

  async update(id: number, updateUserDto: Required<UserUpdateType>): Promise<User> {
    await this.findOne(id);
    const User = await this.db.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
    return User;
  }

  async remove(id: number): Promise<string> {
    await this.findOne(id);
    await this.db.user.delete({
      where: {
        id
      },
    });
    return `Successfully deleted`;
  }

  async checkUser(email: string) {
    const user = await this.db.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new ConflictException('User exist');
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.db.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

}
