import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose, { Types } from "mongoose";
import blogModel from "../models/blogModel";
import { assertIsDefined } from "../util/assertIsDefined";

interface blogBody {
  blogTitle?: string;
  blogContent?: string | null;
}
interface blogParams {
  blogId: string;
}

export const getBlogs: RequestHandler = async (req, res, next) => {
  try {
    const notes = await blogModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const createBlog: RequestHandler<
  unknown,
  unknown,
  blogBody,
  unknown
> = async (req, res, next) => {
  const userId = req.session.userId;
  const blogTitle = req.body.blogTitle;
  const blogContent = req.body.blogContent;

  try {
    if (!blogTitle) {
      throw createHttpError(400, "Parameters missing");
    }
    const newBlog = await blogModel.create({
      userId: userId,
      blogTitle: blogTitle,
      blogContent: blogContent,
      likes: [],
      comments: [],
    });
    console.log(newBlog);
    res.status(201).json(newBlog);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateBlog: RequestHandler<
  blogParams,
  unknown,
  blogBody,
  unknown
> = async (req, res, next) => {
  const blogId = req.params.blogId;
  const blogTitle = req.body.blogTitle;
  const blogContent = req.body.blogContent;
  const authenticatedUser = req.session.userId;

  try {
    assertIsDefined(authenticatedUser);
    if (!mongoose.isValidObjectId(blogId)) {
      throw createHttpError(400, "Invalid blog ID 3");
    }
    if (!blogTitle) {
      throw createHttpError(400, "Title is required");
    }
    const blog = await blogModel.findById(blogId).exec();
    if (!blog) {
      throw createHttpError(404, "Blog not found");
    }
    if (!blog.userId.equals(authenticatedUser)) {
      throw createHttpError(401, "User Not authenticated to update this blog");
    }
    blog.blogTitle = blogTitle;
    blog.blogContent = blogContent;
    const newBlog = await blog.save();
    res.status(200).json(newBlog);
  } catch (error) {
    next(error);
  }
};

export const deleteBlog: RequestHandler<
  blogParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const blogId = req.params.blogId;
  const authenticatedUser = req.session.userId;

  try {
    assertIsDefined(authenticatedUser);
    if (!mongoose.isValidObjectId(blogId)) {
      throw createHttpError(400, "Invalid blog ID 50");
    }
    const blog = await blogModel.findById(blogId).exec();
    if (!blog) {
      throw createHttpError(404, "Blog not found");
    }
    if (!blog.userId.equals(authenticatedUser)) {
      throw createHttpError(401, "User Not authenticated to update this blog");
    }
    await blog.deleteOne();
    if (!blog.$isDeleted) {
      throw createHttpError(500, "Could not delete");
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const likeBlog: RequestHandler<
  blogParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const userId = req.session.userId;
  const blogId = req.params.blogId;

  try {
    if (!mongoose.isValidObjectId(blogId)) {
      throw createHttpError(400, "Invalid blog ID 2");
    }
    const blog = await blogModel.findById(blogId).exec();
    if (!blog) {
      throw createHttpError(404, "Blog not found");
    }
    const likeList: Types.ObjectId[] = blog.likes;

    if (likeList.includes(userId!)) {
      likeList.splice(likeList.indexOf(userId!), 1);
      blog.likes = likeList;
    } else {
      blog.likes.push(userId!);
    }
    const newBlog = await blog.save();
    res.status(200).json(newBlog);
  } catch (error) {
    next(error);
  }
};

