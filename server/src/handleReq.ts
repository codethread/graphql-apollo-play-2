import { Request, Response } from 'express';

export function handleReq(req: Request, res: Response): void {
  console.log(req);
  res.json({ hi: 'ok' });
}
