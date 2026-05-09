import type { NextFunction, Request, Response } from "express";

//req: T instead of req: T extends Request — the constraint belongs on the generic, not the parameter
type AsyncHandler<T extends Request> = (req: T, res: Response, next: NextFunction) => Promise<void>;

export function asyncErrorHandler<T extends Request = Request>(fn: AsyncHandler<T>) {
    // A closure is when a function "remembers" variables from its
    //  outer scope, even after that outer
    //  function has finished executing.
    return (req: T , res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next).catch(next))
    }
}