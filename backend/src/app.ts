import MongoStore from "connect-mongo";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import createHttpError, { isHttpError } from "http-errors";
import { requireAuth } from "./middleware/auth";
import blogRoutes from "./routes/blogRoutes";
import commentRoutes from "./routes/commentRoutes";
import userRoutes from "./routes/userRoutes";
import env from "./util/validateEnv";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
      maxAge: 60*60*1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION_STRING,
    })
  }));

app.use("/api/users", userRoutes);
app.use("/api/blogs", requireAuth, blogRoutes);
app.use("/api/comments", requireAuth, commentRoutes);
app.use(morgan("dev"));
app.use((req, res, next)=>{
    next(createHttpError(404, "Endpoint not found"));
});

app.use((error:unknown, req:Request, res: Response, next: NextFunction)=>{
    let errmsg = "This is a system error";
    let errStatus = 500;

    if(isHttpError(error)){
        errStatus = error.status;
        errmsg = error.message;
    }
    res.status(errStatus).json({error: errmsg});
})

export default app;