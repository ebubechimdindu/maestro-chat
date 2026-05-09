import type { Response } from "express";
import CustomError from "../utils/CustomError";

export const devErrors = (res: Response, error: CustomError) => {
    const statusCode = +error.statusCode || 500;
    res.status(statusCode).json({
        status: error.status,
        code: error.statusCode,
        message: error.message,
        stackTrace: error.stack,
        error: error,
    });
    console.log({
        status: error.status,
        code: error.statusCode,
        message: error.message,
        stackTrace: error.stack,
        error: error,
    })
}

export const prodErrors = (res: Response, error: CustomError) => {
    const statusCode = +error.statusCode || 500;
    const status = error.status;
    if (error.isOperational) {
        res.status(statusCode).json({
            status: status,
            code: error.statusCode,
            message: error.message,
        });
        console.log({
            status: status,
            code: error.statusCode,
            message: error.message,
        })
    } else {
        res.status(500).json({
            status: "Error",
            message: "Something went very wrong!",
        });
    }
}