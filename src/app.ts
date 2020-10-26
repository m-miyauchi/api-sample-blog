import express, { Request, Response, Express } from 'express';
import morgan from 'morgan';
import { SERVER_PORT } from './constants/server_port';

const app: Express = express();

app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(SERVER_PORT, () => {
  console.log(`Server Started: http://127.0.0.1:${SERVER_PORT}`);
});
