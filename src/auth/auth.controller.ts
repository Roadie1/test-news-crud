import {
  Body,
  Controller,
  Post,
  HttpCode,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../dto';
import { User } from '../entities';
import { RequestWithUser } from '../interfaces';
import { LocalAuthGuard } from './localAuth.guard';
import { JwtAuthGuard } from './jwtAuth.guard';
import JwtRefreshGuard from './jwtRefresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser): Promise<User> {
    const { user } = request;
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      user.id,
    );

    const refreshTokenCookie =
      await this.authService.getCookieWithJwtRefreshToken(user.id);

    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return { ...user, password: undefined, hashedRefreshToken: undefined };
  }

  @Post('register')
  async createPost(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.register(createUserDto);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() request: RequestWithUser): Promise<void> {
    const cookies = await this.authService.logout(request.user.id);
    request.res.setHeader('Set-Cookie', cookies);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser): User {
    return {
      ...request.user,
      password: undefined,
      hashedRefreshToken: undefined,
    };
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser): User {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      request.user.id,
    );

    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return {
      ...request.user,
      password: undefined,
      hashedRefreshToken: undefined,
    };
  }
}
