import { Chat } from "../Models/Chat.model";
import { Message } from "../Models/Message.model";
import CustomError from "../utils/CustomError";

export async function getMessagesService(userId?: string, chatId?: string) {
    if (!userId) {
        throw new CustomError("User doesn't exist", 404)
    }

    if (!chatId) {
        throw new CustomError("Chat doesn't exist", 404)
    }

    const chat = Chat.findOne({
        _id:chatId,
        participants: userId
    })

    
    if (!chat) {
        throw new CustomError("Chat not found", 404)
    }

    const messages = await Message.find({
        chat:chatId
    }).populate("sender","name email avatar").sort({createdAt:1})

    return messages
}