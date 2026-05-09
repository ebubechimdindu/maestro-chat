import express from "express";
import type { Request, Response, NextFunction } from "express";
import { authRouter, chatRouter, messageRouter, userRouter } from "./src/routes";
import { clerkMiddleware } from '@clerk/express'
import CustomError from "./src/utils/CustomError";
import globalErrorHandler from "./src/middleware/globalErrorHandler";
import path from "path";

const app = express()

app.use(express.json({ limit: '50mb' }))//parses incoming JSON requests and attaches the result to req.body
app.use(clerkMiddleware())//The clerkMiddleware() function checks the request's cookies and headers for a session JWT and, if found, attaches the Auth object to the request object under the auth key.


app.get("/health", (req, res, next) => {
    res.status(200).send('<h1> API is working well </h1>');
})

app.use("/api/auth",authRouter)
app.use("/api/chat",chatRouter)
app.use("/api/message",messageRouter)
app.use("/api/user",userRouter)


if(process.env.NODE_ENV === "production"){
  const webPath = '../../web/dist'
  app.use(express.static(path.join(__dirname,webPath)))

  app.get("/{*any}",(req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname,webPath))
  })
}


// Global 404 handler - must be last
//for all the URL's that don't match any route
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new CustomError(`Can't find ${req.originalUrl} on this server!`, 404);
  next(err);
});

app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
  globalErrorHandler(error, req, res, next);
});


export default app;
