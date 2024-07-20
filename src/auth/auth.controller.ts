import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ZodValidatorPipe } from 'src/pipes/zod-validator/zod-validator.pipe';
import { createUserSchema, loginSchema, loginType, UserType } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/register')
  async register(
    @Body(new ZodValidatorPipe(createUserSchema)) createUserDto: Required<UserType>,
  ) {
    return this.userService.create(createUserDto);
  }

  @Post('/login')
  async login(
    @Body(new ZodValidatorPipe(loginSchema))
    createUserDto: Required<loginType>,
  ) {
    return this.authService.login(createUserDto);
  }

  @Post('/refresh')
  async refresh(user :any) {
    return this.authService.refresh(user);
  }
}
