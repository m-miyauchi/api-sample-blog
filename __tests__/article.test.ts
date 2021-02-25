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
  let authTokenA: string;
  let authTokenB: string;
  let articleId: number; // 記事ID

  beforeAll(async (done) => {
    const params: PutLoginParams = {
      email: 'charlotte@de.witte',
      password: 'password',
    };

    const r1: AxiosResponse<PutLoginResponse> = await axios.put(
      `http://127.0.0.1:${SERVER_PORT}/login`,
      params
    );
    params.email = 'amelie@lens';
    const r2: AxiosResponse<PutLoginResponse> = await axios.put(
      `http://127.0.0.1:${SERVER_PORT}/login`,
      params
    );
    // トークン2つ取得(Aが正常系使用。Bが異常系)
    authTokenA = r1.data.token;
    authTokenB = r2.data.token;
    done();
  });

  test('作成', async (done) => {
    const params: PostArticleRequestParams = {
      article: {
        title: `Test from Jest`,
        body: 'body.',
      },
    };
    const r: AxiosResponse = await axios.post(
      `http://127.0.0.1:${SERVER_PORT}/article`,
      params,
      {
        headers: {
          auth: authTokenA,
        },
      }
    );
    expect(r.status).toBe(204);
    done();
  });

  test('作成(異常系)', async (done) => {
    const params: PostArticleRequestParams = {
      article: {
        title: `Test from Jest`,
        body: 'body.',
      },
    };
    try {
      const r: AxiosResponse = await axios.post(
        `http://127.0.0.1:${SERVER_PORT}/article`,
        params
      );
    } catch (error) {
      expect(error.message).toBe('Request failed with status code 400');
    }
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

  test('一覧:ページ指定', async (done) => {
    const r: AxiosResponse<GetArticlesRespose> = await axios.get(
      `http://127.0.0.1:${SERVER_PORT}/article?page=2&limit=10`
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
        title: `(Updated)Test from Jest`,
        body: 'updated body,',
      },
    };
    const r: AxiosResponse = await axios.put(
      `http://127.0.0.1:${SERVER_PORT}/article`,
      params,
      {
        headers: {
          auth: authTokenA,
        },
      }
    );
    expect(r.status).toBe(204);
    done();
  });

  test('編集(異常系、権限エラー)', async (done) => {
    const params: PutArticleRequestParams = {
      article: {
        id: articleId,
        title: `(Updated)Test from Jest`,
        body: 'updated body,',
      },
    };
    try {
      const r: AxiosResponse = await axios.put(
        `http://127.0.0.1:${SERVER_PORT}/article`,
        params,
        {
          headers: {
            auth: authTokenB,
          },
        }
      );
    } catch (error) {
      expect(error.message).toHaveLength;
    }
    done();
  });

  test('削除', async (done) => {
    // 削除前の記事総数
    const r1: AxiosResponse<GetArticlesRespose> = await axios.get(
      `http://127.0.0.1:${SERVER_PORT}/article`
    );

    const r2: AxiosResponse = await axios.delete(
      `http://127.0.0.1:${SERVER_PORT}/article/${r1.data.articles[0].id}`,
      {
        headers: {
          auth: authTokenA,
        },
      }
    );

    // 削除後の記事総数
    const r3: AxiosResponse<GetArticlesRespose> = await axios.get(
      `http://127.0.0.1:${SERVER_PORT}/article`
    );

    const articlesBefore = r1.data.articles.length;
    const articlesAfter = r3.data.articles.length;

    expect(r2.status).toBe(204);
    expect(articlesBefore - articlesAfter).toBe(1);
    done();
  });

  test('削除(異常系、権限エラー)', async (done) => {
    try {
      const params: PostArticleRequestParams = {
        article: {
          title: `Test from Jest...削除(異常系)`,
          body: 'body.',
        },
      };
      await axios.post(`http://127.0.0.1:${SERVER_PORT}/article`, params, {
        headers: {
          auth: authTokenA,
        },
      });

      const r: AxiosResponse<GetArticlesRespose> = await axios.get(
        `http://127.0.0.1:${SERVER_PORT}/article`
      );

      await axios.delete(
        `http://127.0.0.1:${SERVER_PORT}/article/${r.data.articles[0].id}`,
        {
          headers: {
            auth: authTokenB,
          },
        }
      );
    } catch (error) {
      expect(error.message).toHaveLength;
    }
    done();
  });
});
