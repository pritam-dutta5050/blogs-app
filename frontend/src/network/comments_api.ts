import { CommentInterface } from "../interfaces/CommentInterface";
import { BlogModel } from "../models/BlogModel";
import { fetchData } from "./blogs_api";

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
  