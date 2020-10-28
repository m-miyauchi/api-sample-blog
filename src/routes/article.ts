import express from 'express';
const router = express.Router();

// 記事 一覧取得
router.get('/article', (req: Request, res: Response) => {
  res.send(stub.getArticles());
});
// 記事 詳細取得
router.get('/article/:id', (req: Request, res: Response) => {
  res.send(stub.getArticle());
});
// 記事 新規投稿
router.post(
  '/article',
  (req: Request<PostArticleRequestParams>, res: Response) => {
    res.status(204).end();
  }
);
// 記事 編集
router.put(
  '/article',
  (req: Request<PutArticleRequestParams>, res: Response) => {
    res.status(204).end();
  }
);
// 記事 削除
router.delete('/article/:id', (req: Request, res: Response) => {
  res.status(204).end();
});

export default router;
