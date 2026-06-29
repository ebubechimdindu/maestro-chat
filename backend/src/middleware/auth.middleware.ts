import type { NextFunction, Request, Response } from "express";
import { User } from "../Models/User.model";
import { asyncErrorHandler } from "./asyncErrorHandler";
import { clerkClient, getAuth } from "@clerk/express";
import CustomError from "../utils/CustomError";

export const protect = asyncErrorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = getAuth(req)

    if (!userId) {
        throw new CustomError("You are not logged in", 401);
    }

    // Use Clerk's JavaScript Backend SDK to get the user's User object
    const user = await clerkClient.users.getUser(userId)

    
    if (!user) {
        throw new CustomError("The user for this token no longer exists", 401);
    }

    console.log(user.id,userId,"auth.middleware.js")
    req.user = {
        userId,
        clerkId: user.id,
        email:user.primaryEmailAddress?.emailAddress!,
        phoneNumber:user.primaryPhoneNumber?.phoneNumber
    }

    next();

})