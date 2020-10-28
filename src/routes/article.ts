import express, { Request, Response } from 'express';
import { PostArticleRequestParams } from '../types/api/post_article_request_params';
import { PutArticleRequestParams } from '../types/api/put_article_request_params';
import Stub from '../modules/stub';

const router = express.Router();
const stub = new Stub();

// 記事 一覧取得
router.get('/', (req: Request, res: Response) => {
  res.send(stub.getArticles());
});
// 記事 詳細取得
router.get('/:id', (req: Request, res: Response) => {
  res.send(stub.getArticle());
});
// 記事 新規投稿
router.post('/', (req: Request<PostArticleRequestParams>, res: Response) => {
  res.status(204).end();
});
// 記事 編集
router.put('/', (req: Request<PutArticleRequestParams>, res: Response) => {
  res.status(204).end();
});
// 記事 削除
router.delete('/:id', (req: Request, res: Response) => {
  res.status(204).end();
});

export default router;
