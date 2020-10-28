import express, { Request, Response } from 'express';
// modules
import MemberModel from '../modules/models/member';
// type
import { PutLoginParams } from '../types/api/put_login_params';
import { PutLoginResponse } from '../types/api/put_login_response';

const router = express.Router();

// ログイン
router.put(
  '/',
  async (req: Request<PutLoginParams>, res: Response<PutLoginResponse>) => {
    const memberModel = new MemberModel();
    let r: PutLoginResponse;

    try {
      r = await memberModel.login(req.body);
      if (r !== void 0) {
        res.send(r);
      }
    } catch (error) {
      console.error(error);
    }

    res.send(r);
  }
);

export default router;
