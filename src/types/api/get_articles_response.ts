import { ArticleSummary } from '../article_summary';
import { Page } from './page';

// GET /article の返し値
export type GetArticlesRespose = {
  articles: ArticleSummary[];
  page: Page;
};
