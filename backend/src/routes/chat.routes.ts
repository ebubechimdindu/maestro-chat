import express from 'express'
import { protect } from '../middleware/auth.middleware';
import { createChatController, getChats } from '../controllers/chat.controller';

const chatRouter = express.Router()

chatRouter.use(protect)


chatRouter.get("/", getChats);
chatRouter.post("/:participantId", createChatController);


export default chatRouter;