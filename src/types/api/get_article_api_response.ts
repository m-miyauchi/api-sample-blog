import { ArticleSummary } from '../article_summary'

// GET /article の返し値
export type GetArticleRespose = {
    articles: ArticleSummary[]
}