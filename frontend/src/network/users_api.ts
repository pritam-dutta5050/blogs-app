import { LoginInterface } from "../interfaces/LoginInterface";
import { SignupInterface } from "../interfaces/SignupInterface";
import { UserModel } from "../models/UserModel";
import { fetchData } from "./blogs_api";

export async function getloggedinUser(): Promise<UserModel> {
    const response = await fetchData("/api/users/complete", {
      method: "GET",
    });
    return response.json();
  }

  export async function signupUser(
    credentials: SignupInterface
  ): Promise<UserModel> {
    const response = await fetchData("/api/users/signup", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }

  export async function loginUser(
    credentials: LoginInterface
  ): Promise<UserModel> {
    const response = await fetchData("/api/users/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
  export async function logoutUser() {
    await fetchData("/api/users/logout", { method: "POST" });
  }
  
  export async function getUserById(blogId: string): Promise<UserModel> {
    const response = await fetchData("api/users/" + blogId, { method: "GET" });
    return response.json();
  }

  export async function updateUser(userData: UserModel, userId: string): Promise<UserModel>{
    const response = await fetchData("api/users/" + userId, {
      method: "PATCH",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }