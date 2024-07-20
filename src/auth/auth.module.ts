import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports : [
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '60s' },
      secretOrPrivateKey: process.env.SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService],

})
export class AuthModule {}
