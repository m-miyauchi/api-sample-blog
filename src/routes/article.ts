import express, { Request, Response } from 'express';
// modules
import ArticleModel from '../modules/models/aritcle';
import MemberModel from '../modules/models/member';
// type
import { PostArticleRequestParams } from '../types/api/post_article_request_params';
import { PutArticleRequestParams } from '../types/api/put_article_request_params';
import { GetArticlesRespose } from '../types/api/get_articles_response';
import { GetArticleResponse } from '../types/api/get_article_response';
import { DeleteArticleRequestParams } from '../types/api/delte_article_request_params';
import { ArticleSummary } from '../types/article_summary';

const router = express.Router();

// 記事 一覧取得
router.get('/', async (req: Request, res: Response<GetArticlesRespose>) => {
  const r: GetArticlesRespose = {
    articles: [],
  };
  const articleModel = new ArticleModel();
  const articles = articleModel.getArticles();

  const tmp: ArticleSummary[] = (await articles).map((item) => {
    const a: ArticleSummary = {
      id: item.id,
      title: item.title.substring(0, 29),
      summary: item.body.substring(0, 199),
      updatedAt: item.updated_at.toDateString(),
    };
    return a;
  });
  r.articles = tmp;

  res.send(r);
});

// 記事 詳細取得
router.get('/:id', async (req: Request, res: Response<GetArticleResponse>) => {
  const r: GetArticleResponse = {};
  const articleModel = new ArticleModel();
  const memberModel = new MemberModel();
  const a = await articleModel.getArticle(Number(req.params.id));
  if (a !== void 0) {
    const m = await memberModel.findOne(a.author_member_id);
    r.article = {
      id: a.id,
      title: a.title,
      body: a.body,
      createdAt: a.created_at.toDateString(),
      updatedAt: a.updated_at.toDateString(),
      author: {
        memberId: m.id,
        name: m.name,
      },
    };
  }
  res.send(r);
});

// 記事 新規投稿
router.post(
  '/',
  async (req: Request<PostArticleRequestParams>, res: Response) => {
    const articleModel = new ArticleModel();
    try {
      const a = await articleModel.createArticle(
        // @ts-ignore
        req.headers.auth,
        req.body
      );
      if (a !== void 0) {
        res.status(204).end();
        return 0;
      }
    } catch (error) {
      console.error(error);
    }
    res.status(400).end();
  }
);

// 記事 編集
router.put(
  '/',
  async (req: Request<PutArticleRequestParams>, res: Response) => {
    const articleModel = new ArticleModel();
    try {
      // @ts-ignore
      const a = await articleModel.updateArticle(req.headers.auth, req.body);
      console.log(a);
      if (a !== void 0) {
        res.status(204).end();
        return 0;
      }
    } catch (error) {
      console.error(error);
    }
    res.status(400).end();
  }
);

// 記事 削除
router.delete(
  '/',
  async (req: Request<DeleteArticleRequestParams>, res: Response) => {
    const articleModel = new ArticleModel();
    try {
      const a = await articleModel.deleteArticle(
        // @ts-ignore
        req.headers.auth,
        req.body
      );
      if (a !== void 0) {
        res.status(204).end();
        return 0;
      }
    } catch (error) {
      console.error(error);
    }
    res.status(400).end();
  }
);

export default router;
