import { Server as HttpServer } from "http";
import { Socket, Server as SocketServer } from 'socket.io';
import CustomError from "../utils/CustomError";
import { verifyToken } from "@clerk/express";
import { User } from "../Models/User.model";
import { onlineUsers } from "./store";
import { Chat } from "../Models/Chat.model";
import { Message } from "../Models/Message.model";

export interface CustomSocket extends Socket {
    data: {
        userId: string;
    };
}

export const initializeSocket = (httpServer: HttpServer) => {
    const allowedOrigins = [
        "http://localhost:8081", // Expo mobile
        "http://localhost:5173", // Vite web dev
        process.env.FRONTEND_URL, // production
    ].filter(Boolean) as string[];

    const io = new SocketServer(httpServer,
        {
            cors: { origin: allowedOrigins },
        
        });

    io.use(async (socket: CustomSocket, next) => {
        const token = socket.handshake.auth.token; // this is what user will send from client
        if (!token) {
            const error = new CustomError("Authentication error", 400)
            return next(error)
        }

        try {
            const session = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY! });

            const clerkId = session.sub;

            const user = await User.findOne({ clerkId });

            if (!user) {
                throw new CustomError("User not found", 401)
            }

            socket.data.userId = user._id.toString();

            next();
        } catch (error: any) {
            next(new Error(error));
        }
    })

    io.on('connection', (socket: CustomSocket) => {
        const userId = socket.data.userId

        socket.emit("online-users", {
            userIds: Array.from(onlineUsers.keys())
        })

        //store user in the onlineUsers map
        onlineUsers.set(userId, socket)

        //notify others that this current user is online
        // sends to EVERYONE except the current user who just connected
        socket.broadcast.emit("user-online", {
            userId
        })

        socket.join(`user:${userId}`);

        socket.on("join-chat", (chatId: string) => {
            socket.join(`chat:${chatId}`);
        })

        socket.on("leave-chat", (chatId: string) => {
            socket.leave(`chat:${chatId}`);
        })

        socket.on("send-meesage", async (data: { chatId: string, text: string }) => {
            try {
                const { chatId, text } = data
                const chat = await Chat.findOne({
                    _id: chatId,
                    participants: userId
                })

                if (!chat) {
                    socket.emit("socket-error", { message: "Chat not found" })
                    return
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

                // emit to chat room (for users inside the chat)
                io.to(`chat:${chatId}`).emit("new-message", message);

                // also emit to participants' personal rooms (for chat list view)
                for (const participantId of chat.participants) {
                    io.to(`user:${participantId}`).emit("new-message", message);
                }


                // 

            } catch (error) {

            }
        })

        socket.on("typing", async (data: { chatId: string; isTyping: boolean }) => {

        })

        socket.on("disconnect", () => {
            onlineUsers.delete(userId);

            // notify others
            socket.broadcast.emit("user-offline", { userId });
        });
    });
}