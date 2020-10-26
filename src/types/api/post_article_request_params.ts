// POST /article のリクエスト時パラメータ
export type PostArticleRequestParams = {
  memberId: number; // メンバーのシステム管理ID
  article: {
    title: string; // 表題
    body: string; // 本文
  };
};
