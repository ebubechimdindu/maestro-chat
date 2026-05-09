import express from 'express'
import { protect } from '../middleware/auth.middleware';
import { getUserProfile, getUsers } from '../controllers/user.controller';

const userRouter = express.Router()

userRouter.get("/me", protect, getUserProfile)
userRouter.get("/", protect, getUsers);


export default userRouter;