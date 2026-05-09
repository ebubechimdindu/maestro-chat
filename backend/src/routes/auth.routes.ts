import express from 'express'
import { authCallback } from '../controllers/auth.controller';

const authRouter = express.Router()

authRouter.post("/auth", authCallback)


export default authRouter;