// POST /article のリクエスト時パラメータ
export type PutArticleRequestParams = {
  article: {
    id: string; // 記事ID
    title: string; // 表題
    body: string; // 本文
  };
};
