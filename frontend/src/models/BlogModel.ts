import { CommentModel } from "./commentModel";

export interface BlogModel{
    _id : string,
    userId : string,
    blogTitle : string,
    blogContent : string,
    likes : string[],
    comments : CommentModel[],
    createdAt : string,
    updatedAt : string,   
    __v: number,
}