import express, { Response } from 'express';
import MemberModel from '../modules/models/member';
import { Req } from '../interfaces/request_headers';
const router = express.Router();

// ログアウト
router.put('/', async (req: Req, res: Response) => {
  const memberModel = new MemberModel();
  try {
    const t = await memberModel.logout(req.headers.token);
    if (t !== void 0) {
      res.status(204).end();
    }
  } catch (error) {
    console.error(error);
  }
  res.status(400).end();
});

export default router;
