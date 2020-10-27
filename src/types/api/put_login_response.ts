// PUT /login の返し値
export type PutLoginResponse = {
  isSuccessLogin: boolean; // ログイン実行結果
  error?: string; // エラーメッセージ

  // ログイン成功時は以下を取得可能
  member?: {
    id: number; // システムの内部ID
    name: string; // 投稿者名
    email: string; // メールアドレス(ログイン情報)
  };
  token?: string; // アクセストークン
};
