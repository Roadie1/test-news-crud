import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NewsModule } from './news/news.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database';

@Module({
  imports: [ConfigModule.forRoot(), NewsModule, AuthModule, DatabaseModule],
})
export class AppModule {}
