import faker from 'faker';
import ArticleModel from '../src/modules/models/aritcle';
import MemberModel from '../src/modules/models/member';
import { PostArticleRequestParams } from '../src/types/api/post_article_request_params';
import { PutLoginParams } from '../src/types/api/put_login_params';
import createDbConnection from '../src/modules/create_db_connection';

const NUM = 100;

async function getToken(): Promise<string> {
  const member = new MemberModel();
  // ここを任意に変えればそのユーザで記事作成が可能
  const params: PutLoginParams = {
    email: 'charlotte@de.witte',
    password: 'password',
  };

  const r = await member.login(params);
  return r.token;
}

async function createArticle(token: string) {
  const article = new ArticleModel();
  const title = faker.lorem.sentence();
  const body = faker.lorem.paragraphs(20);

  const params: PostArticleRequestParams = {
    article: {
      title,
      body,
    },
  };
  console.log('Title:', title);

  await article.createArticle(token, params);
}

async function main() {
  await createDbConnection();

  const token = await getToken();
  for (let index = 0; index < NUM; index++) {
    await createArticle(token);
  }

  process.exit(0);
}
main();
