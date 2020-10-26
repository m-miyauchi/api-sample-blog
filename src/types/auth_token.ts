// 認証トークン
export type AuthToken = {
   memberId:  number; // メンバーのシステム管理ID
   token: string; // トークンコード
   expiredAt: string; // トークン失効日時
}