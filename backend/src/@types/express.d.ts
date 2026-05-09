import { Request } from "express";


/**
 * Extend Express Request to include authenticated user data.
 */
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        clerkId:string;
        email: string;
        phoneNumber?: string;
      };
    }
  }
}


/**
 * Express Request with typed body
 * So it has four generic type parameters:
 * interface Request<Params = any, ResBody = any, ReqBody = any, ReqQuery = any>
 * - Params → the type of req.params (e.g., URL params like /user/:id)
 * - ResBody → the type you plan to send in res.json() (response body)
 * - ReqBody → the type of req.body (your POST/PUT request body)
 * - ReqQuery → the type of req.query (query string params like ?page=1)
 */
export type BodyRequest<T> = Request<{}, {}, T>;

/**
 * Express Request with typed params and body
 */
export type ParamsBodyRequest<P, B> = Request<P, {}, B>;

/**
 * Express Request with typed params, body, and query
 */
export type FullRequest<P, B, Q> = Request<P, {}, B, Q>;