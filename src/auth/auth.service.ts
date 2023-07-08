import bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, UserDto } from '../dto';
import { User } from '../entities';
import { UsersService } from '../users/users.service';
import { TokenPayload } from '../interfaces';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  DEFAULT_SALT = 10;

  async login(loginDto: UserDto): Promise<User> {
    const { email, password } = loginDto;

    try {
      const user = await this.userService.findUserByEmail(email);
      const isPasswordMatching = await bcrypt.compare(password, user.password);

      if (!isPasswordMatching) {
        throw new HttpException(
          'Incorrect email or password',
          HttpStatus.BAD_REQUEST,
        );
      }

      return user; // TODO
    } catch (error) {
      throw new HttpException(
        'Incorrect email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async register(createUserDto: CreateUserDto): Promise<void> {
    const { email, password } = createUserDto;

    if (!email || !password) {
      throw new HttpException(
        'Email and password can not be empty',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const hashedPassword = await bcrypt.hash(password, this.DEFAULT_SALT);

      await this.userService.createUser({
        ...createUserDto,
        password: hashedPassword,
      });
    } catch (error) {
      if (error?.code === 23505) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
