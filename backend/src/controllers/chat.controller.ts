import type { Response } from "express";
import type { BodyRequest, ParamsBodyRequest } from "../@types/express";
import { asyncErrorHandler } from "../middleware/asyncErrorHandler";
import { clerkClient, getAuth } from "@clerk/express";
import CustomError from "../utils/CustomError";
import { User } from "../Models/User.model";
import { authCallbackService } from "../services/auth.service";
import { getChatsService } from "../services/chat.service";
import { Chat } from "../Models/Chat.model";

export const getChats = asyncErrorHandler(async (req: BodyRequest<{}>, res: Response) => {

    const chats = getChatsService(req.user?.userId)

    res.status(200).json({
        success: true,
        message: "Chats fetched successful",
        data: chats
    })

})

export const createChatController = asyncErrorHandler(async (req: ParamsBodyRequest<{ participantId: string }, {}>, res: Response) => {
    const userId = req.user?.userId;
    const { participantId } = req.params;

    if (!participantId) {
        throw new CustomError("Participant ID is required", 404)
    }

    if (userId === participantId) {
        throw new CustomError("Cannot create chat with yourself", 400)
    }

    // check if chat already exists
    // populate lets you reference documents in other collections.
    let chat = await Chat.findOne({
        participants: { $all: [userId, participantId] },
    })
        .populate("participants", "name email avatar")
        .populate("lastMessage");

    if (!chat) {
        const newChat = new Chat({ participants: [userId, participantId] });
        await newChat.save();
        chat = await newChat.populate("participants", "name email avatar");
    }

    const otherParticipant = chat.participants.find((p: any) => p._id.toString() !== userId);

    const createdChat = {
        _id: chat._id,
        participant: otherParticipant ?? null,
        lastMessage: chat.lastMessage,
        lastMessageAt: chat.lastMessageAt,
        createdAt: chat.createdAt,
    }

    res.status(201).json({
        success: true,
        message: "Chats Created successfully",
        data: createdChat
    })

})