import {Request, Response} from "express";

export function handleReq(req: Request, res: Response) {
    console.log(req)
    res.json({hi: 'ok'});

}