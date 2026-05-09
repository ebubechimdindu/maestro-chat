import type { NextFunction, Request, Response } from "express";
import CustomError from "../utils/CustomError";
import { devErrors, prodErrors } from "../controllers/error.controller";

export default function globalErrorHandler(
    err: CustomError,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
   
    if (process.env.NODE_ENV === 'development') {
        return devErrors(res, err);
    }

    if (process.env.NODE_ENV === 'production') {
        return prodErrors(res, err);
    }
};