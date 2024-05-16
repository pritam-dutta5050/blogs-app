import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose, { Types } from "mongoose";
import blogModel from "../models/blogModel";
import commentModel, { commentInterface } from "../models/commentModel";
import { assertIsDefined } from "../util/assertIsDefined";

interface blogParams {
  blogId: string;
}
interface commentBody {
  commentId?: string;
  commentText: string;
}

export const commentBlog: RequestHandler<
  blogParams,
  unknown,
  commentBody,
  unknown
> = async (req, res, next) => {
  const blogId = req.params.blogId;
  const userId = req.session.userId;
  const commentText = req.body.commentText;

  try {
    if (!mongoose.isValidObjectId(blogId)) {
      throw createHttpError(400, "Invalid blog ID 1");
    }
    const blog = await blogModel.findById(blogId).exec();
    if (!blog) {
      throw createHttpError(404, "Blog not found");
    }
    if (!commentText) {
      throw createHttpError(400, "Comment text is required");
    }
    const newComment = await commentModel.create({
      commentText: commentText,
      commentBy: userId,
    });
    blog.comments.push(newComment);
    const newBlog = await blog.save();
    res.status(200).json(newBlog);
  } catch (error) {
    next(error);
  }
};

interface deleteCommentbody {
  commentId: Types.ObjectId;
}

export const deleteComment: RequestHandler<
  blogParams,
  unknown,
  deleteCommentbody,
  unknown
> = async (req, res, next) => {
  const commentId = req.body.commentId;
  const blogId = req.params.blogId;
  const authenticatedUser = req.session.userId;

  try {
    assertIsDefined(authenticatedUser);
    if (
      !mongoose.isValidObjectId(commentId) ||
      !mongoose.isValidObjectId(blogId)
    ) {
      throw createHttpError(400, "Invalid comment or blog ID");
    }
    const blog = await blogModel.findById(blogId).exec();
    if (!blog) {
      throw createHttpError(404, "Blog not found");
    }
    const comments: Types.DocumentArray<commentInterface> = blog.comments;
    const comment: commentInterface = comments.find(
      (item) => item.id === commentId
    ) as commentInterface;
    // const comment = comments.filter((item) => item.id === commentId);
    // console.log(comment);
    if (!comment) {
      throw createHttpError(404, "Comment not found");
    }
    const commentUser = comment?.commentBy;

    if (
      !blog.userId.equals(authenticatedUser) &&
      !commentUser?.equals(authenticatedUser)
    ) {
      throw createHttpError(
        401,
        "User Not authenticated to delete this comment"
      );
    }
    const newComments: Types.DocumentArray<commentInterface> = comments
      .filter((item) => item.id !== commentId)
      .map((i) => i) as Types.DocumentArray<commentInterface>;
    blog.comments = newComments;
    const newBlog = await blog.save();
    // console.log(newBlog);
    res.status(200).json(newBlog);
  } catch (error) {
    next(error);
  }
};

export const editComment: RequestHandler<
  blogParams,
  unknown,
  commentBody,
  unknown
> = async (req, res, next) => {
  const blogId = req.params.blogId;
  const commentText = req.body.commentText;
  const commentId = req.body.commentId;
  const authenticatedUser = req.session.userId;

  try {
    assertIsDefined(authenticatedUser);
    if (
      !mongoose.isValidObjectId(blogId) ||
      !mongoose.isValidObjectId(commentId)
    ) {
      throw createHttpError(400, "Invalid blog ID or Comment ID");
    }
    if (!commentText) {
      throw createHttpError(400, "Comment text is required");
    }
    const blog = await blogModel.findById(blogId).exec();
    if (!blog) {
      throw createHttpError(404, "Blog not found");
    }
    

    const indexOfComment = blog.comments.findIndex(comment => comment.id === commentId);
    const editedComment = blog.comments[indexOfComment];
    editedComment.commentText = commentText;
    blog.comments.splice(indexOfComment, 1, editedComment);

    const newBlog = await blog.save();
    res.status(200).json(newBlog);
  } catch (error) {
    next(error);
  }
};
