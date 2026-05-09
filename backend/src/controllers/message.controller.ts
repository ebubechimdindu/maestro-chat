import type { Response } from "express"
import { asyncErrorHandler } from "../middleware/asyncErrorHandler"
import type { BodyRequest, ParamsBodyRequest } from "../@types/express"
import { getMessagesService } from "../services/message.service"

export const getMessagesController = asyncErrorHandler(async (req: ParamsBodyRequest<{ chatId: string }, {}>, res: Response) => {
    const { chatId } = req.params
    const messages = getMessagesService(req.user?.userId,chatId)

    res.status(201).json({
        success: true,
        message: "Messages fetched Successfully",
        data: messages
    })

})