import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, UserDto } from '../dto';

@Injectable()
export class AuthService {
  private users: UserDto[] = [{ id: '', email: '' }];

  login(loginDto: any): Promise<UserDto> {
    const user = this.users.find((user) => user.email === loginDto.email);
    if (user) {
      return Promise.resolve(user);
    }
    throw new HttpException(
      'Incorrect email or password ',
      HttpStatus.UNAUTHORIZED,
    );
  }

  register(createUserDto: CreateUserDto): Promise<void> {
    return Promise.resolve();
  }
}
