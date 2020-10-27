// POST /article のリクエスト時パラメータ
export type PostArticleRequestParams = {
  article: {
    title: string; // 表題
    body: string; // 本文
  };
};
