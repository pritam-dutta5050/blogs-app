import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const requireAuth:RequestHandler= (req,res,next)=>{
    /**
     * $ Allow if there is active session cookie in the browser, else throw 401 error which is further handled by next function in app.ts
     */
    if(req.session.userId){
        console.log("there is a session/cookie active in the browser");
        next();
    }
    else{
        console.log("there is no session/cookie in the browser");
        next(createHttpError(401,"user not authenticated"));
    }
}