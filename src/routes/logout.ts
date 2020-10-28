import express, { Request, Response } from 'express';
import { PutLoginParams } from '../types/api/put_login_params';
import Stub from '../modules/stub';

const router = express.Router();
const stub = new Stub();

// ログアウト
router.put('/', (req: Request, res: Response) => {
  res.status(204).end();
});

export default router;
