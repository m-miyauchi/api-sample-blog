import express, { Request, Response } from 'express';
import MemberModel from '../modules/models/member';
const router = express.Router();

// ログアウト
router.put('/', async (req: Request, res: Response) => {
  const memberModel = new MemberModel();
  memberModel.logout(req.headers.authorization);
  res.status(204).end();
});

export default router;
