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

    const chat = await Chat.findOne({
        _id: chatId,
        participants: userId
    })


    if (!chat) {
        throw new CustomError("Chat not found", 404)
    }

    const messages = await Message.find({
        chat: chatId
    }).populate("sender", "name email avatar").sort({ createdAt: 1 })

    return messages
}

export async function createMessage({ userId, chatId, text }: { userId?: string, chatId?: string, text: string }) {
    if (!userId) {
        throw new CustomError("User doesn't exist", 404)
    }

    if (!chatId) {
        throw new CustomError("Chat doesn't exist", 404)
    }

    const chat = await Chat.findOne({
        _id: chatId,
        participants: userId
    })


    if (!chat) {
        throw new CustomError("Chat not found", 404)
    }

    const message = await Message.create({
        chat: chatId,
        sender: userId,
        text
    })

    chat.lastMessage = message._id
    chat.lastMessageAt = new Date();
    await chat.save()

    await message.populate("sender", "name email avatar")

    return { message, chat }
}