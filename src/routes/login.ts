import express, { Request, Response } from 'express';
import { PutLoginParams } from '../types/api/put_login_params';
import Stub from '../modules/stub';

const router = express.Router();
const stub = new Stub();

// ログイン
router.put('/login', (req: Request<PutLoginParams>, res: Response) => {
  res.send(stub.putLogin());
});
// ログアウト
router.put('/logout', (req: Request, res: Response) => {
  res.status(204).end();
});

export default router;
