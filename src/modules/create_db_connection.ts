import { createConnection, Connection } from 'typeorm';
const connectionName = 'app';

export default class CreateDBConnection {
  public async createConnection(): Promise<Connection> {
    try {
      const connection: Connection = await createConnection({
        name: connectionName,
        type: 'postgres',
        host: process.env.NODE_ENV === 'production' ? 'db' : '127.0.0.1',
        port: process.env.NODE_ENV === 'production' ? 5432 : 5431,
        username: 'postgres',
        password: '1111',
        database: 'commmit',
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
      throw new Error(error);
    }
  }
}
