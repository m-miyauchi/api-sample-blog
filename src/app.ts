import express, { Request, Response, Express } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
// modules
import createDBConnection from './modules/create_db_connection';
// routes
import loginRoutes from './routes/login';
import logoutRoutes from './routes/logout';
import articleRoutes from './routes/article';
// constants
import { SERVER_PORT } from './constants/server_port';

function main() {
  // setup
  createDBConnection();
  const app: Express = express();
  app.use(morgan('dev'));
  app.use(helmet());

  // routes
  app.use('login', loginRoutes);
  app.use('logout', logoutRoutes);
  app.use('article', articleRoutes);
  app.get('/', (req: Request, res: Response) => {
    res.send('API for sample blog app.');
  });

  app.listen(SERVER_PORT, async () => {
    console.log(`Server Started: http://127.0.0.1:${SERVER_PORT}`);
  });
}

main();
