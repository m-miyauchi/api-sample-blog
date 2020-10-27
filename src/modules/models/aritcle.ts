import { getRepository, Connection, Repository } from 'typeorm';
import { Article as ArticleEnity } from '../../entity/article';
import CONNECTION_NAME from '../../constants/default_db_connection';
import { PostArticleRequestParams } from '../../types/api/post_article_request_params';
import { PutArticleRequestParams } from '../../types/api/put_article_request_params';
import { DeleteArticleRequestParams } from '../../types/api/delte_article_request_params';

export default class Article {
  private connectionName = CONNECTION_NAME;
  private repository: Repository<ArticleEnity>;

  constructor(connection?: Connection) {
    if (connection !== undefined) {
      this.connectionName = connection.name;
    } else {
      this.connectionName = this.connectionName;
    }
    this.repository = getRepository(ArticleEnity, this.connectionName);
  }

  public async createArticle(
    params: PostArticleRequestParams
  ): Promise<ArticleEnity> {
    try {
      const a = await this.repository.save({
        title: params.article.title,
        body: params.article.body,
        author_member_id: params.memberId,
      });
      return a;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getArticles(): Promise<ArticleEnity[]> {
    let a: ArticleEnity[] | undefined;
    try {
      a = await this.repository.find();
      return a;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateArticle(
    params: PutArticleRequestParams
  ): Promise<ArticleEnity | undefined> {
    let a: ArticleEnity | undefined;
    try {
      a = await this.repository.findOne(params.article.id);
      if (a !== undefined) {
        a.title = params.article.title;
        a.body = params.article.body;
        a = await this.repository.save(a);
      }
    } catch (error) {
      throw new Error(error);
    }
    return a;
  }

  public async deleteArticle(
    params: DeleteArticleRequestParams
  ): Promise<ArticleEnity> {
    let a: ArticleEnity | undefined;
    try {
      a = await this.repository.findOne(params.articleId);
      a.deleted = true;
      a = await this.repository.save(a);
    } catch (error) {
      throw new Error(error);
    }
    return a;
  }
}
