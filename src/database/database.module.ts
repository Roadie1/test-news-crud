import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        username: configService.get('PGUSER'),
        host: configService.get('PGHOST'),
        password: configService.get('PGPASSWORD'),
        database: configService.get('PGDATABASE'),
        port: configService.get('PGPORT'),
        entities: [__dirname + '/../**/*.entity.ts'],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
