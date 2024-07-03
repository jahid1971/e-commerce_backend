import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsynch = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((err) => {
            console.log(err, "err", req.body, "req.body in catch block of catchAsynch");
            next(err);
        });
    };
};
export default catchAsynch;
