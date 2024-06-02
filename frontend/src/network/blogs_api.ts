import { ConflictError, UnauthorizedError } from "../errors/httperrors";
import { BlogInterface } from "../interfaces/BlogInterface";
import { BlogModel } from "../models/BlogModel";

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


export async function fetchBlogs(): Promise<BlogModel[]> {
  const response = await fetchData("/api/blogs/", {
    method: "GET",
  });
  return response.json();
}

export async function addBlog(blogBody: BlogInterface): Promise<BlogModel> {
  const response = await fetchData("api/blogs/", {
    method: "POST",
    body: JSON.stringify(blogBody),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}
export async function updateBlog(blogBody: BlogInterface, blogId: string): Promise<BlogModel> {
  const response = await fetchData("api/blogs/" + blogId, {
    method: "PATCH",
    body: JSON.stringify(blogBody),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}
export async function deleteBlog( blogId : string) {
  await fetchData("api/blogs/" + blogId, {method: "DELETE"});
}
export async function likeBlog(blogId: string | undefined): Promise<BlogModel> {
  const response = await fetchData("/api/blogs/like/" + blogId, {
    method: "POST",
  });
  return response.json();
}

