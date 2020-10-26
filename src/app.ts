import express, { Request, Response, Express } from 'express';
import morgan from 'morgan';
import { SERVER_PORT } from './constants/server_port';
import createDBConnection from './modules/create_db_connection';

createDBConnection();
const app: Express = express();
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  res.send('API for sample blog app.');
});
// ログイン
app.put('/login', (req: Request, res: Response) => {
  res.send('');
});
// ログアウト
app.put('/logout', (req: Request, res: Response) => {
  res.send('');
});
// 記事 一覧取得
app.get('/article', (req: Request, res: Response) => {
  res.send('');
});
// 記事 詳細取得
app.get('/article/:id', (req: Request, res: Response) => {
  res.send('');
});
// 記事 新規投稿
app.post('/article', (req: Request, res: Response) => {
  res.send('');
});
// 記事 編集
app.put('/article', (req: Request, res: Response) => {
  res.send('');
});
// 記事 削除
app.delete('/article/:id', (req: Request, res: Response) => {
  res.send('');
});

app.listen(SERVER_PORT, async () => {
  console.log(`Server Started: http://127.0.0.1:${SERVER_PORT}`);
});
