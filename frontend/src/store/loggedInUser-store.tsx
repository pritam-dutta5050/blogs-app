import React, { createContext, useEffect, useReducer } from "react";
import { LoginInterface } from "../interfaces/LoginInterface";
import { SignupInterface } from "../interfaces/SignupInterface";
import { UserModel } from "../models/UserModel";
import * as UsersApi from "../network/users_api";

type UserContextAction =
  | { type: "GET_USER"; payload: { userPayload: UserModel } }
  | { type: "SIGNUP_USER"; payload: { user: UserModel } }
  | { type: "LOGIN_USER"; payload: { user: UserModel } }
  | { type: "LOGOUT_USER"; payload: { user: UserModel | null } }
  | { type: "UPDATE_USER"; payload: { user: UserModel } };

interface UserContextProps {
  user: UserModel | null;
  getUser: () => void;
  signUpUser: (credentials: SignupInterface) => void;
  loginUser: (credentials: LoginInterface) => void;
  logoutUser: () => void;
  updateUser: (user: UserModel, userId: string) => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  getUser: () => {},
  signUpUser: () => {},
  loginUser: () => {},
  logoutUser: () => {},
  updateUser: () => {},
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
  } else if (action.type === "UPDATE_USER") {
    newUser = action.payload.user;
  }
  return newUser;
};

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, dispatchUser] = useReducer(UserContextReducer, null);

  const getUser = async () => {
    console.log("fetching user details");
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

  const updateUser = async (userdata: UserModel, userId:string) => {
    try {
      console.log("Inside store...");
      console.log(userdata);
      const user = await UsersApi.updateUser(userdata, userId);
      console.log(user);
      dispatchUser({
        type: "UPDATE_USER",
        payload: {
          user: user,
        },
      });
      alert("Updated user successfully");
    } catch (error) {
      console.error(error);
      alert("Update user failed");
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: user,
        getUser: getUser,
        signUpUser: signUpUser,
        loginUser: loginUser,
        logoutUser: logoutUser,
        updateUser: updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
