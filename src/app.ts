import express, { Request, Response, Express } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { SERVER_PORT } from './constants/server_port';
import createDBConnection from './modules/create_db_connection';
import Stub from './modules/stub';
// routes
import loginRoutes  from './routes/login';
import articleRoutes from './routes/article';

function main() {
  // setup
  createDBConnection();
  const app: Express = express();
  app.use(morgan('dev'));
  app.use(helmet());

  app.use('login', loginRoutes);
  app.use('article', articleRoutes);

  // routes
  app.get('/', (req: Request, res: Response) => {
    res.send('API for sample blog app.');
  });
  app.listen(SERVER_PORT, async () => {
    console.log(`Server Started: http://127.0.0.1:${SERVER_PORT}`);
  });
}

main();
