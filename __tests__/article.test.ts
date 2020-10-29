import axios, { AxiosResponse } from 'axios';
// type
import { PutLoginParams } from '../src/types/api/put_login_params';
import { PutLoginResponse } from '../src/types/api/put_login_response';
import { PostArticleRequestParams } from '../src/types/api/post_article_request_params';
import { GetArticlesRespose } from '../src/types/api/get_articles_response';
import { GetArticleResponse } from '../src/types/api/get_article_response';
import { PutArticleRequestParams } from '../src/types/api/put_article_request_params';
// constants
import { SERVER_PORT } from '../src/constants/server_port';

describe('記事', () => {
  let authToken: string;
  let articleId: number; // 記事ID

  beforeAll(async (done) => {
    const params: PutLoginParams = {
      email: 'charlotte@de.witte',
      password: 'password',
    };

    const r: AxiosResponse<PutLoginResponse> = await axios.post(
      `http://127.0.0.1:${SERVER_PORT}/login`,
      params
    );
    authToken = r.data.token;
    done();
  });

  test('作成', async (done) => {
    const params: PostArticleRequestParams = {
      article: {
        title: `Test from Jest ${Date.toString}`,
        body: 'body.',
      },
    };
    const r: AxiosResponse = await axios.post(
      `http://127.0.0.1:${SERVER_PORT}/article`,
      params,
      {
        headers: {
          auth: authToken,
        },
      }
    );
    expect(r.status).toBe(204);
    done();
  });

  test('一覧', async (done) => {
    const r: AxiosResponse<GetArticlesRespose> = await axios.get(
      `http://127.0.0.1:${SERVER_PORT}/article`
    );
    articleId = r.data.articles[0].id;
    expect(r.data.articles[0].title.length).toBeGreaterThan(0);
    done();
  });

  test('詳細', async (done) => {
    const r: AxiosResponse<GetArticleResponse> = await axios.get(
      `http://127.0.0.1:${SERVER_PORT}/article/${articleId}`
    );
    expect(r.data.article.title.length).toBeGreaterThan(0);
    done();
  });

  test('編集', async (done) => {
    const params: PutArticleRequestParams = {
      article: {
        id: articleId,
        title: `(Updated)Test from Jest ${Date.toString}`,
        body: 'updated body,',
      },
    };
    const r: AxiosResponse = await axios.put(
      `http://127.0.0.1:${SERVER_PORT}/article`,
      params,
      {
        headers: {
          auth: authToken,
        },
      }
    );
    expect(r.status).toBe(204);
    done();
  });

  test('削除', async (done) => {
    const r: AxiosResponse = await axios.delete(
      `http://127.0.0.1:${SERVER_PORT}/article`,
      {
        headers: {
          auth: authToken,
        },
      }
    );
    expect(r.status).toBe(204);
    done();
  });
});
