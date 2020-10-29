// PUT /login の返し値
export type PutLoginResponse = {
  isSuccessLogin: boolean; // ログイン実行結果
  // ログイン成功時は以下を取得可能
  member: {
    name: string; // 投稿者名
    email: string; // メールアドレス(ログイン情報)
  };
  token: string; // アクセストークン
  error: string; // エラーメッセージ
};
