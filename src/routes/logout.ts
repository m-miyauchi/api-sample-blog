import express, { Request, Response } from 'express';
const router = express.Router();

// ログアウト
router.put('/', (req: Request, res: Response) => {
  res.status(204).end();
});

export default router;
