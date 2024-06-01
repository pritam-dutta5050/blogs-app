import React, { createContext, useReducer } from "react";
import { UserModel } from "../models/UserModel";
import * as BlogsApi from "../network/blogs_api";
import { SignupInterface } from "../interfaces/SignupInterface";
import { LoginInterface } from "../interfaces/LoginInterface";

type UserContextAction =
  | { type: "GET_USER"; payload: { user: UserModel | null } }
  | { type: "SIGNUP_USER"; payload: { user: UserModel } }
  | { type: "LOGIN_USER"; payload: { user: UserModel } }
  | { type: "LOGOUT_USER"; payload: { user: UserModel | null } };

interface UserContextProps {
  user: UserModel | null;
  getUser: () => void;
  signUpUser: (credentials: SignupInterface) => void;
  loginUser: (credentials: LoginInterface) => void;
  logoutUser: () => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  getUser: () => {},
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
    newUser = action.payload.user;
  } else if (action.type === "SIGNUP_USER") {
    newUser = action.payload.user;
  } else if (action.type === "LOGIN_USER") {
    newUser = action.payload.user;
  } else if (action.type === "LOGOUT_USER") {
    newUser = action.payload.user;
  }
//   console.log(newUser);
  return newUser;
};

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, dispatchUser] = useReducer(UserContextReducer, null);

  const getUser = async () => {
    try {
      const user = await BlogsApi.getloggedinUser();

      dispatchUser({
        type: "GET_USER",
        payload: {
          user: user,
        },
      });
    } catch (error) {
      // console.log("Error in fetching loggedin user");
      console.error(error);
      return null;
    }
  };
  const signUpUser = async (credentials: SignupInterface) => {
    try {
      const user = await BlogsApi.signupUser(credentials);
      dispatchUser({
        type: "SIGNUP_USER",
        payload: {
          user: user,
        },
      });
    } catch (error) {
      // console.log("Error in fetching loggedin user");
      console.error(error);
    }
  };
  const loginUser = async (credentials: LoginInterface) => {
    try {
      const user = await BlogsApi.loginUser(credentials);
      dispatchUser({
        type: "LOGIN_USER",
        payload: {
          user: user,
        },
      });
    } catch (error) {
      // console.log("Error in fetching loggedin user");
      console.error(error);
    }
  };
  const logoutUser = async () => {
    try {
      await BlogsApi.logoutUser();
      dispatchUser({
        type: "LOGOUT_USER",
        payload: {
          user: null,
        },
      });
    } catch (error) {
      // console.log("Error in fetching loggedin user");
      console.error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        getUser: getUser,
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
