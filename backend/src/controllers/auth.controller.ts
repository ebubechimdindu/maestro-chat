import type { Response } from "express";
import type { BodyRequest } from "../@types/express";
import { asyncErrorHandler } from "../middleware/asyncErrorHandler";
import { clerkClient, getAuth } from "@clerk/express";
import CustomError from "../utils/CustomError";
import { User } from "../Models/User.model";
import { authCallbackService } from "../services/auth.service";

export const authCallback = asyncErrorHandler(async (req: BodyRequest<{}>, res: Response) => {
    const { userId: clerkId } = getAuth(req)

    const user = authCallbackService(clerkId)

    res.status(201).json({
        success: true,
        message: "Authentication successful",
        data: user
    })

})