import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();
const options: DataSourceOptions = {
  type: 'postgres',
  username: configService.get('PGUSER'),
  host: configService.get('PGHOST'),
  password: configService.get('PGPASSWORD'),
  database: configService.get('PGDATABASE'),
  port: configService.get('PGPORT'),
};

export default new DataSource(options);
