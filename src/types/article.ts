import { ArticleAuthor} from './article_author';

// 記事
export type Article = {
    title: string // 表題
    body: string // 本文
    author: ArticleAuthor // 投稿者情報
    createdAt: string // 投稿日時
    updatedAt: string // 最終更新日時
}