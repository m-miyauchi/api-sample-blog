// PUT /article のリクエスト時パラメータ
export type PutArticleRequestParams = {
  article: {
    id: number; // 記事ID
    title: string; // 表題
    body: string; // 本文
  };
};
