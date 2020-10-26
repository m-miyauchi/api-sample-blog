// PUT /login の返し値
export type PutLoginResponse = {
    member: {
        id: number // システムの内部ID
        name: string // 投稿者名
        email: string // メールアドレス(ログイン情報)
    }    
}