import { getAuth, clerkClient } from "@clerk/express";
import CustomError from "../utils/CustomError";
import { User } from "../Models/User.model";

export async function authCallbackService(clerkId: string | null) {

    if (!clerkId) {
        throw new CustomError("You are not logged in", 401);
    }

    // Use Clerk's JavaScript Backend SDK to get the user's User object
    const user = await User.findOne({ clerkId })

    if (!user) {
        const clerkUser = await clerkClient.users.getUser(clerkId)

        const user = User.create({
            clerkId: clerkId,
            name: clerkUser.fullName ? clerkUser.fullName : undefined,
            email: clerkUser.primaryEmailAddress?.emailAddress,
            phoneNumber: clerkUser.primaryPhoneNumber?.phoneNumber,
            avatar: clerkUser.imageUrl
        })

        return user
    }

    return user
}