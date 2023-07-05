import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './';
import { CreateUserDto, UserDto } from '../dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: any): Promise<UserDto> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  createPost(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.register(createUserDto);
  }
}
