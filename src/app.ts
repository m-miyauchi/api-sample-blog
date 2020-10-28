import express, { Request, Response, Express } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
// modules
import createDBConnection from './modules/create_db_connection';
// routes
import loginRoute from './routes/login';
import logoutRoute from './routes/logout';
import articleRoutes from './routes/article';
// constants
import { SERVER_PORT } from './constants/server_port';

async function main() {
  // setup
  const app: Express = express();
  app.use(morgan('dev'));
  app.use(helmet());

  // routes
  app.use('login', loginRoute);
  app.use('logout', logoutRoute);
  app.use('article', articleRoutes);
  app.get('/', (req: Request, res: Response) => {
    res.send('API for sample blog app.');
  });

  app.listen(SERVER_PORT, async () => {
    console.log(`Server Started: http://127.0.0.1:${SERVER_PORT}`);
    await createDBConnection();
  });
}

main();
