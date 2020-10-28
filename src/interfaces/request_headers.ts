import { Request } from 'express';
// HTTPヘッダにて認証するため定義を拡張
export interface Req extends Request {
  headers: {
    token: string;
  };
}
