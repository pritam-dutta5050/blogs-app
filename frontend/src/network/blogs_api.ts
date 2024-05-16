import { ConflictError, UnauthorizedError } from "../errors/httperrors";
import { CommentInterface } from "../interfaces/CommentInterface";
import { LoginInterface } from "../interfaces/LoginInterface";
import { SignupInterface } from "../interfaces/SignupInterface";
import { BlogModel } from "../models/BlogModel";
import { UserModel } from "../models/UserModel";

export async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    if (response.status === 401) {
      throw new UnauthorizedError(errorMessage);
    } else if (response.status === 409) {
      throw new ConflictError(errorMessage);
    } else {
      throw Error(
        "request failed with status code : " +
          response.status +
          " message: " +
          errorMessage
      );
    }
  }
}

export async function getloggedinUser(): Promise<UserModel> {
  const response = await fetchData("/api/users", {
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

export async function addComment(
  commentBody: CommentInterface,
  blogId: string
): Promise<BlogModel> {
  const response = await fetchData("api/comments/" + blogId, {
    method: "POST",
    body: JSON.stringify(commentBody),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function deleteComment(
  commentId: string,
  blogId: string
): Promise<BlogModel> {
  const response = await fetchData("api/comments/" + blogId, {
    method: "DELETE",
    body: JSON.stringify({ commentId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function editComment(commentBody: CommentInterface, blogId: string): Promise<BlogModel> {
    const response = await fetchData("api/comments/" + blogId, {
      method: "PATCH",
      body: JSON.stringify(commentBody),
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

export async function fetchBlogs(): Promise<BlogModel[]> {
  const response = await fetchData("/api/blogs/", {
    method: "GET",
  });
  return response.json();
}

export async function likeBlog(blogId: string | undefined): Promise<BlogModel> {
  const response = await fetchData("/api/blogs/like/" + blogId, {
    method: "POST",
  });
  return response.json();
}

export async function getUserById(blogId: string): Promise<UserModel> {
  const response = await fetchData("api/users/" + blogId, { method: "GET" });
  return response.json();
}
