import express, { Request, Response, Express } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { SERVER_PORT } from './constants/server_port';
import createDBConnection from './modules/create_db_connection';
import Stub from './modules/stub';
// Type
import { PostArticleRequestParams } from './types/api/post_article_request_params';
import { PutArticleRequestParams } from './types/api/put_article_request_params';

function main() {
  // setup
  createDBConnection();
  const app: Express = express();
  app.use(morgan('dev'));
  app.use(helmet());
  const stub = new Stub();

  // routes
  app.get('/', (req: Request, res: Response) => {
    res.send('API for sample blog app.');
  });

  // ログイン
  app.put('/login', (req: Request, res: Response) => {
    res.send(stub.putLogin());
  });
  // ログアウト
  app.put('/logout', (req: Request, res: Response) => {
    res.status(204).end();
  });
  // 記事 一覧取得
  app.get('/articles', (req: Request, res: Response) => {
    res.send(stub.getArticles());
  });
  // 記事 詳細取得
  app.get('/article/:id', (req: Request, res: Response) => {
    res.send(stub.getArticle());
  });
  // 記事 新規投稿
  app.post(
    '/article',
    (req: Request<PostArticleRequestParams>, res: Response) => {
      res.status(204).end();
    }
  );
  // 記事 編集
  app.put(
    '/article',
    (req: Request<PutArticleRequestParams>, res: Response) => {
      res.status(204).end();
    }
  );
  // 記事 削除
  app.delete(
    '/article/:id',
    (req: Request<PutArticleRequestParams>, res: Response) => {
      res.status(204).end();
    }
  );

  app.listen(SERVER_PORT, async () => {
    console.log(`Server Started: http://127.0.0.1:${SERVER_PORT}`);
  });
}

main();
