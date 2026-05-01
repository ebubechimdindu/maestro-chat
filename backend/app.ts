import express from "express";
import type { Request, Response, NextFunction } from "express";
import { authRouter, chatRouter, messageRouter, userRouter } from "./src/routes";

const app = express()

app.use(express.json({ limit: '50mb' }))//parses incoming JSON requests and attaches the result to req.body

app.get("/health", (req, res, next) => {
    res.status(200).send('<h1> API is working well </h1>');
})

app.use("/api/auth",authRouter)
app.use("/api/chat",chatRouter)
app.use("/api/message",messageRouter)
app.use("/api/user",userRouter)

export default app;
