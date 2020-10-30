import { createConnection, Connection } from 'typeorm';
import CONNECTION_NAME from '../constants/default_db_connection';
import { DB_HOSTS } from '../constants/db_hosts';

export default async function CreateDBConnection(): Promise<Connection> {
  try {
    const connection: Connection = await createConnection({
      name: CONNECTION_NAME,
      type: 'postgres',
      host:
        process.env.NODE_ENV === 'production'
          ? DB_HOSTS.development
          : DB_HOSTS.production,
      port: 5432,
      username: 'postgres',
      password: '1111',
      database: 'blog',
      synchronize: true,
      logging: false,
      entities: [
        process.env.NODE_ENV === 'production'
          ? 'dist/bundle.js'
          : 'src/entity/*.ts',
      ],
      migrations: [
        process.env.NODE_ENV === 'production'
          ? 'dist/bundle.js'
          : 'src/migration/*.ts',
      ],
      cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
      },
    });
    console.log('🔌 Database Connection has been established successfully.');
    return connection;
  } catch (error) {
    console.error(error);
  }
}
