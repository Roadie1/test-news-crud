import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto';
import { User } from '../entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user) {
      return user;
    }

    throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (user) {
      return user;
    }

    throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
    return newUser;
  }
}
