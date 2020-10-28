import express, { Request, Response } from 'express';
import ArticleModel from '../modules/models/aritcle';
import { PostArticleRequestParams } from '../types/api/post_article_request_params';
import { PutArticleRequestParams } from '../types/api/put_article_request_params';
import { GetArticlesRespose } from '../types/api/get_articles_response';
import { ArticleSummary } from '../types/article_summary';
import Stub from '../modules/stub';

const router = express.Router();
const articleModel = new ArticleModel();
const stub = new Stub();

// 記事 一覧取得
router.get('/', async (req: Request, res: Response<GetArticlesRespose>) => {
  const r: GetArticlesRespose = {
    articles: [],
  };
  const articles = articleModel.getArticles();

  const tmp: ArticleSummary[] = (await articles).map((item) => {
    const a: ArticleSummary = {
      title: item.title,
      summary: item.body.substring(0, 49),
      updatedAt: item.updated_at,
    };
    return a;
  });
  r.articles = tmp;

  res.send(r);
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
