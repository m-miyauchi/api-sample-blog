import express, { Request, Response, Express } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
// Modules
import createDBConnection from './modules/create_db_connection';
// Routes
import loginRoute from './routes/login';
import logoutRoute from './routes/logout';
import articleRoutes from './routes/article';
// Constants
import { SERVER_PORT } from './constants/server_port';

async function main() {
  // Setup
  const app: Express = express();
  app.use(morgan('dev'));
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  // HTTP header settings
  // Arrow CORS
  if (app.get('env') === 'development') {
    app.use(function (_req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, auth'
      );
      res.header(
        'Access-Control-Allow-Methods',
        'POST, PUT, DELETE, GET, OPTIONS'
      );
      next();
    });
  }

  // Routes
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
