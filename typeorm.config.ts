import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Post, User } from './src/entities';
import { CreateTables1688902367048 } from './migrations/1688902367048-CreateTables';

config();

const configService = new ConfigService();
const options: DataSourceOptions = {
  type: 'postgres',
  username: configService.get('PGUSER'),
  host: configService.get('PGHOST'),
  password: configService.get('PGPASSWORD'),
  database: configService.get('PGDATABASE'),
  port: configService.get('PGPORT'),
  entities: [Post, User],
  migrations: [CreateTables1688902367048],
};

export default new DataSource(options);
