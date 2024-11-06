import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'postgres-db',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'nestdb',
  entities: [User],
  synchronize: true,
};
