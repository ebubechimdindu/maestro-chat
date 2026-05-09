import { getAuth, clerkClient } from "@clerk/express";
import CustomError from "../utils/CustomError";
import { User } from "../Models/User.model";
import { Chat } from "../Models/Chat.model";

export async function getChatsService(userId?: string ) {
    if (!userId) {
        throw new CustomError("User doesn't exist", 404)
    }

    const chats = await Chat.find({ participants: userId })
        .populate("participants", "name email avatar")
        .populate("lastMessage")
        .sort({ lastMessageAt: -1 })

    const formattedChats = chats.map((chat) => {
        const otherParticipant = chat.participants.find((p) => p._id.toString() !== userId);

        return {
            _id: chat._id,
            participant: otherParticipant ?? null,
            lastMessage: chat.lastMessage,
            lastMessageAt: chat.lastMessageAt,
            createdAt: chat.createdAt,
        };
    });

    return formattedChats

}