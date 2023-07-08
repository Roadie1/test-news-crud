import {
  Body,
  Controller,
  Post,
  HttpCode,
  UseGuards,
  Req,
  Res,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../dto';
import { User } from '../entities';
import { RequestWithUser } from '../interfaces';
import { LocalAuthGuard } from './localAuth.guard';
import { JwtAuthGuard } from './jwtAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ): Promise<User> {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    return { ...user, password: undefined };
  }

  @Post('register')
  async createPost(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.register(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    return { ...request.user, password: undefined };
  }
}
