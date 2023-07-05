import { Module } from '@nestjs/common';
import { AuthController, AuthService } from './';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
