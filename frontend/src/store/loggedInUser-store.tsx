import { createContext } from "react";
import { UserModel } from "../models/UserModel";

export const LoggedinUserContext = createContext<UserModel|null>(null);