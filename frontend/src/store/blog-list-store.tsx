import React, { createContext, useReducer } from "react";
import { BlogModel } from "../models/BlogModel";
import * as BlogsApi from "../network/blogs_api";

type BlogListAction =
  | { type: "LOAD_BLOGS"; payload: { blogsBuffer: BlogModel[] } }
  | { type: "ADD_BLOG"; payload: { blog: BlogModel } }
  | { type: "EDIT_BLOG"; payload: { blog: BlogModel; blogId: string } }
  | { type: "DELETE_BLOG"; payload: { blogId: string } }
  | { type: "HIDE_BLOG"; payload: { blogId: string } };

interface BlogListContextProps {
  blogList: BlogModel[];
  loadBlogs: () => void;
  addBlog: (blog: BlogModel) => void;
  editBlog: (blog: BlogModel, blogId: string) => void;
  deleteBlog: (blogId: string) => void;
  hideBlog: (blogId: string) => void;
}

export const BlogListContext = createContext<BlogListContextProps>({
  blogList: [],
  loadBlogs: () => {},
  addBlog: () => {},
  editBlog: () => {},
  deleteBlog: () => {},
  hideBlog: () => {},
});

const BlogListReducer = (currBlogList: BlogModel[], action: BlogListAction) => {
  let newBlogList = currBlogList;
  if (action.type === "HIDE_BLOG") {
    newBlogList = currBlogList.filter(
      (blog) => blog._id !== action.payload.blogId
    );
  } else if (action.type === "LOAD_BLOGS") {
    newBlogList = action.payload.blogsBuffer;
  } else if (action.type === "DELETE_BLOG") {
    newBlogList = currBlogList.filter(
      (blog) => blog._id !== action.payload.blogId
    );
  } else if (action.type === "ADD_BLOG") {
    newBlogList = [action.payload.blog, ...currBlogList];
  } else if (action.type === "EDIT_BLOG") {
    newBlogList = currBlogList.map((blog) =>
      blog._id === action.payload.blogId ? action.payload.blog : blog
    );
  }
  return newBlogList;
};

const BlogListContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const [blogList, dispatchBlogList] = useReducer(BlogListReducer, []);

  const loadBlogs = async () => {
    try {
      const blogsBuffer = await BlogsApi.fetchBlogs();
      dispatchBlogList({
        type: "LOAD_BLOGS",
        payload: {
          blogsBuffer: blogsBuffer,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addBlog = (blog: BlogModel) => {
    dispatchBlogList({
      type: "ADD_BLOG",
      payload: {
        blog: blog,
      },
    });
  };

  const editBlog = (blog: BlogModel, blogId: string) => {
    dispatchBlogList({
      type: "EDIT_BLOG",
      payload: {
        blog: blog,
        blogId: blogId,
      },
    });
  };

  const deleteBlog = async (blogId: string) => {
    try {
      await BlogsApi.deleteBlog(blogId);
      dispatchBlogList({
        type: "DELETE_BLOG",
        payload: {
          blogId: blogId,
        },
      });
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };
  
  const hideBlog = (blogId: string) => {
    console.log(blogId);
    dispatchBlogList({
      type: "HIDE_BLOG",
      payload: {
        blogId: blogId,
      },
    });
  };

  return (
    <BlogListContext.Provider
      value={{
        blogList: blogList,
        loadBlogs: loadBlogs,
        addBlog: addBlog,
        editBlog: editBlog,
        deleteBlog: deleteBlog,
        hideBlog: hideBlog,
      }}
    >
      {children}
    </BlogListContext.Provider>
  );
};

export default BlogListContextProvider;
