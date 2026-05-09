import type { NextFunction, Response } from "express";
import type { BodyRequest } from "../@types/express";
import { asyncErrorHandler } from "../middleware/asyncErrorHandler";
import { getAllUsers, getUserData } from "../services/user.service";

export const getUserProfile = asyncErrorHandler(
    async (req: BodyRequest<{}>, res: Response) => {
        const profile = await getUserData(req.user?.userId);

        res.status(200).json({
            success: true,
            message: "User profile retrieved successfully",
            data: profile,
        });
    }
);


export const getUsers = asyncErrorHandler(
    async (req: BodyRequest<{}>, res: Response) => {
        const profile = await getAllUsers(req.user?.userId);

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: profile,
        });
    }
);
