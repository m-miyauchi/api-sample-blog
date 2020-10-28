import { getRepository, Connection, Repository } from 'typeorm';
import { Article as ArticleEnity } from '../../entity/article';
import AuthTokenModel from './auth_token';
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
    tokenCode: string,
    params: PostArticleRequestParams
  ): Promise<ArticleEnity> {
    let a: ArticleEnity | undefined;
    try {
      const authTokenModel = new AuthTokenModel();
      const t = await authTokenModel.findEnableToken(tokenCode);
      if (t !== undefined) {
        a = await this.repository.save({
          title: params.article.title,
          body: params.article.body,
          author_member_id: t.member_id,
        });
      }
      return a;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getArticle(id: number): Promise<ArticleEnity> {
    let a: ArticleEnity | undefined;
    try {
      a = await this.repository.findOne(id);
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
    tokenCode: string,
    params: PutArticleRequestParams
  ): Promise<ArticleEnity | undefined> {
    let a: ArticleEnity | undefined;
    try {
      const authTokenModel = new AuthTokenModel();
      const t = await authTokenModel.findEnableToken(tokenCode);
      a = await this.repository.findOne(params.article.id);

      if (a !== undefined) {
        if (a.author_member_id === t.member_id) {
          a.title = params.article.title;
          a.body = params.article.body;
          a = await this.repository.save(a);
        }
      }
    } catch (error) {
      throw new Error(error);
    }
    return a;
  }

  public async deleteArticle(
    tokenCode: string,
    params: DeleteArticleRequestParams
  ): Promise<ArticleEnity> {
    let a: ArticleEnity | undefined;
    const authTokenModel = new AuthTokenModel();
    const t = await authTokenModel.findEnableToken(tokenCode);
    try {
      a = await this.repository.findOne(params.articleId);
      if (a !== undefined) {
        if (a.author_member_id === t.member_id) {
          a.deleted = true;
          a = await this.repository.save(a);
        }
      }
    } catch (error) {
      throw new Error(error);
    }
    return a;
  }
}
