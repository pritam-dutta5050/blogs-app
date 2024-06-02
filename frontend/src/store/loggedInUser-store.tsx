import React, { createContext, useEffect, useReducer } from "react";
import { UserModel } from "../models/UserModel";
import * as UsersApi from "../network/users_api";
import { SignupInterface } from "../interfaces/SignupInterface";
import { LoginInterface } from "../interfaces/LoginInterface";

type UserContextAction =
  | { type: "GET_USER"; payload: { userPayload: UserModel } }
  | { type: "SIGNUP_USER"; payload: { user: UserModel } }
  | { type: "LOGIN_USER"; payload: { user: UserModel } }
  | { type: "LOGOUT_USER"; payload: { user: UserModel | null } };

interface UserContextProps {
  user: UserModel | null;
  // getUser: () => void;
  signUpUser: (credentials: SignupInterface) => void;
  loginUser: (credentials: LoginInterface) => void;
  logoutUser: () => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  signUpUser: () => {},
  loginUser: () => {},
  logoutUser: () => {},
});

const UserContextReducer = (
  currUser: UserModel | null,
  action: UserContextAction
) => {
  let newUser = currUser;
  if (action.type === "GET_USER") {
    newUser = action.payload.userPayload;
  } else if (action.type === "SIGNUP_USER") {
    newUser = action.payload.user;
  } else if (action.type === "LOGIN_USER") {
    newUser = action.payload.user;
  } else if (action.type === "LOGOUT_USER") {
    newUser = action.payload.user;
  }
  return newUser;
};

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, dispatchUser] = useReducer(UserContextReducer, null);

  const getUser = async () => {
    try {
      const userRes = await UsersApi.getloggedinUser();
      dispatchUser({
        type: "GET_USER",
        payload: {
          userPayload: userRes,
        },
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const signUpUser = async (credentials: SignupInterface) => {
    try {
      const user = await UsersApi.signupUser(credentials);
      dispatchUser({
        type: "SIGNUP_USER",
        payload: {
          user: user,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const loginUser = async (credentials: LoginInterface) => {
    try {
      const user = await UsersApi.loginUser(credentials);
      dispatchUser({
        type: "LOGIN_USER",
        payload: {
          user: user,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const logoutUser = async () => {
    try {
      await UsersApi.logoutUser();
      dispatchUser({
        type: "LOGOUT_USER",
        payload: {
          user: null,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    getUser();
  },[]);
  return (
    <UserContext.Provider
      value={{
        user: user,
        signUpUser: signUpUser,
        loginUser: loginUser,
        logoutUser: logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
