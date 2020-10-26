export interface OrmConfig {
  name: string;
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
  entities: string[];
  migrations: string[];
  cli: {
    entitiesDir: string;
    migrationsDir: string;
    subscribersDir: string;
  };
}
