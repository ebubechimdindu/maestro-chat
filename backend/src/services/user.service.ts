import { User } from "../Models/User.model"
import CustomError from "../utils/CustomError"

export const getUserData = async (id?: string) => {
    if (!id) {
        throw new CustomError("User doesn't exist", 404)
    }

    const userData = await User.findById(id)

    if (userData) {
        throw new CustomError("User not found", 404)
    }

    return userData

}

export const getAllUsers = async (id?: string) => {
    if (!id) {
        throw new CustomError("User doesn't exist", 404)
    }

    const userId = id;

    const users = await User.find({ _id: { $ne: userId } })
        .select("name email avatar")
        .limit(50);



    return users
}