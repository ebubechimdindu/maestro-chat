import express from 'express'
import { protect } from '../middleware/auth.middleware';
import { getMessagesController } from '../controllers/message.controller';

const messageRouter = express.Router()

messageRouter.use(protect)
messageRouter.get("/chat/:chatId/messages", getMessagesController);


export default messageRouter;