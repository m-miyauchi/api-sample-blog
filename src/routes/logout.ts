import express, { Request, Response } from 'express';
// modules
import MemberModel from '../modules/models/member';

const router = express.Router();

// ログアウト
router.put('/', async (req: Request, res: Response) => {
  const memberModel = new MemberModel();
  try {
    // @ts-ignore
    const t = await memberModel.logout(req.headers.auth);
    if (t !== void 0) {
      res.status(204).end();
    }
  } catch (error) {
    console.error(error);
  }
  res.status(400).end();
});

export default router;
