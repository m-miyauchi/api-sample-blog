import express, { Request, Response, Express } from 'express';
import morgan from 'morgan';
import { SERVER_PORT } from './constants/server_port';
import createDBConnection from './modules/create_db_connection';

const app: Express = express();
createDBConnection();

app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(SERVER_PORT, async () => {
  console.log(`Server Started: http://127.0.0.1:${SERVER_PORT}`);
});
