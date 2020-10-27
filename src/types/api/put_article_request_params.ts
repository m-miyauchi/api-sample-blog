// POST /article のリクエスト時パラメータ
export type PutArticleRequestParams = {
  article: {
    id: number; // 記事のID
    title: string; // 表題
    body: string; // 本文
  };
};
