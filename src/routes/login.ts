import express from 'express';
const router = express.Router();

// ログイン
router.put('/login', (req: Request<PutLoginParams>, res: Response) => {
  res.send(stub.putLogin());
});
// ログアウト
router.put('/logout', (req: Request, res: Response) => {
  res.status(204).end();
});

export default router;
