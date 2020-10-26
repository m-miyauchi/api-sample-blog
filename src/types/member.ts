// ログイン可能なメンバー情報
export type Member = {
    id: number // システムの内部ID
    name: string // 投稿者名
    email: string // メールアドレス(ログイン情報)
    password: string // パスワード(ログイン情報)
}