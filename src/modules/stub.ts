import faker from 'faker';
import dayjs from 'dayjs';
import { PutLoginResponse } from '../types/api/put_login_response';
import { PutLogoutResponse } from '../types/api/put_logout_response';
import { GetArticlesRespose } from '../types/api/get_articles_response';
import { GetArticleResponse } from '../types/api/get_article_response';
import { Article } from '../types/article';
import { ArticleSummary } from '../types/article_summary';

export default class Stub {
  // constants
  private memberId = 1276;
  private memberName = 'Charlotte De Witte';
  // mock data
  private articles: ArticleSummary[];
  private articleCreatedAt: string;
  private articleUpdatedAt: string;
  constructor() {
    this.articles = this.genArticles;
    this.articleCreatedAt = dayjs().subtract(2, 'week').toString();
    this.articleUpdatedAt = dayjs().subtract(1, 'day').toString();
  }

  public putLogin(): PutLoginResponse {
    return {
      isSuccessLogin: true,
      member: {
        id: this.memberId,
        name: this.memberName,
        email: 'charlotte@de.witte',
      },
    };
  }

  public putLogout(): PutLogoutResponse {
    return {
      success: true,
    };
  }

  public getArticles(): GetArticlesRespose {
    return {
      articles: this.articles,
    };
  }

  public getArticle(): GetArticleResponse {
    return {
      article: this.genArticle,
    };
  }

  private get genArticles(): ArticleSummary[] {
    const result: ArticleSummary[] = [];
    for (let i = 0; i < 10; i++) {
      const articleSummary: ArticleSummary = {
        title: faker.lorem.words(),
        summary: `${faker.lorem.sentences().substring(0, 49)}...`,
        updatedAt: dayjs().subtract(i, 'day').toString(),
      };
      result.push(articleSummary);
    }
    return result;
  }

  private get genArticle(): Article {
    return {
      title: faker.lorem.words(),
      body: faker.lorem.paragraphs(15),
      author: {
        memberId: this.memberId,
        name: this.memberName,
      },
      createdAt: this.articleCreatedAt,
      updatedAt: this.articleUpdatedAt,
    };
  }
}
