import { createContext } from "react";
import { UserModel } from "../models/UserModel";

interface LoggedinUserContextProps{
    userData: UserModel | null,
}

export const LoggedinUserContext = createContext<LoggedinUserContextProps>({
    userData : null,
});