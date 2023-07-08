import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PostsModule,
    AuthModule,
    DatabaseModule,
    UsersModule,
  ],
})
export class AppModule {}
