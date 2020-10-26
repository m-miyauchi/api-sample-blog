import { Article} from '../article';

// GET /article の返し値
export type GetArticleRespose = {
    articles: Article[]
}