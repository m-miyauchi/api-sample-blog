// POST /article のリクエスト時パラメータ
export type PutArticleRequestParams = {
  article: {
    title: string; // 表題
    body: string; // 本文
  };
};
