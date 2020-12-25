import express, { Request, Response, Express } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
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
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(function (_req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'POST, PUT, DELETE, GET, OPTIONS'
    );
    // クロスオリジン許可
    if (app.get('env') === 'development') {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
    }
    next();
  });

  // routes
  app.use('/login', loginRoute);
  app.use('/logout', logoutRoute);
  app.use('/article', articleRoutes);
  app.get('/', (_req: Request, res: Response) => {
    res.send('API for sample blog app.');
  });

  app.listen(SERVER_PORT, async () => {
    console.log(`Server Started: http://127.0.0.1:${SERVER_PORT}`);
    await createDBConnection();
  });
}

main();
