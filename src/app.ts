import express, { Request, Response, Express } from 'express';
import morgan from 'morgan';
import { SERVER_PORT } from './constants/server_port';

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
// 記事一覧取得
app.get('/article', (req: Request, res: Response) => {
  res.send('');
});
// 記事詳細取得
app.get('/article/:id', (req: Request, res: Response) => {
  res.send('');
});
// 記事新規投稿
app.post('/article/create', (req: Request, res: Response) => {
  res.send('');
});
// 記事編集
app.put('/article/update/:id', (req: Request, res: Response) => {
  res.send('');
});
// 記事削除
app.delete('/article/deleter/:id', (req: Request, res: Response) => {
  res.send('');
});

app.listen(SERVER_PORT, () => {
  console.log(`Server Started: http://127.0.0.1:${SERVER_PORT}`);
});
