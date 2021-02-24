import express, { Request, Response } from 'express';
// modules
import MemberModel from '../modules/models/member';
import { PutLogoutResponse } from '../types/api/put_logout_response';

const router = express.Router();

// ログアウト
router.put('/', async (req: Request, res: Response) => {
  const memberModel = new MemberModel();
  const basicResponse: PutLogoutResponse = { success: false };
  try {
    // @ts-ignore
    const t = await memberModel.logout(req.headers.auth);
    if (t !== void 0) {
      const r: PutLogoutResponse = { ...basicResponse, success: true };
      res.status(200).send(r).end();
      return 0;
    }
  } catch (error) {
    console.error(error);
    const r: PutLogoutResponse = { ...basicResponse, error };
    res.status(400).send(r).end();
  }
  res.status(400).end();
});

export default router;
