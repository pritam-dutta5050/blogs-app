import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BlogModel } from "../models/BlogModel";
import * as BlogsApi from "../network/blogs_api";
import { BlogInterface } from "../interfaces/BlogInterface";

interface BloglistState{
    BlogList: BlogModel[],
    status: "idle" | "pending" | "succeeded" | "failed",
}

const initialBloglistState: BloglistState = {
    BlogList:[],
    status: "idle"
}

interface singleBlogInterface{
    blog: BlogModel|null,
    status: "idle" | "pending" | "succeeded" | "failed",
}
export const fetchBlogs = createAsyncThunk("bloglist/fetchBlogs",async ()=>{
    let resObj:BloglistState = {BlogList:[], status:"idle"};
    try {
        const resBlogs = await BlogsApi.fetchBlogs();
        resObj.BlogList = resBlogs;
        resObj.status = "succeeded";
        return resObj;
    } catch (error) {
        console.error(error);
        resObj.BlogList = [];
        resObj.status = "failed";
        return resObj;
    }
});
export const addBlog = createAsyncThunk("bloglist/addBlog",async (blog:BlogInterface)=>{
    let resObj: singleBlogInterface = {blog:null, status:"idle"};
    try {
        const resBlog = await BlogsApi.addBlog(blog);
        resObj.blog = resBlog;
        resObj.status = "succeeded";
        return resObj;
    } catch (error) {
        console.error(error);
        resObj.status = "failed";
        return resObj;
    }
});
export const updateBlog = createAsyncThunk("bloglist/updateBlog",async (payload:{blog:BlogInterface, blogId:string})=>{
    console.log("Updating blog...");
    let resObj: singleBlogInterface = {blog:null, status:"idle"};
    try {
        const resBlog = await BlogsApi.updateBlog(payload.blog,payload.blogId);
        resObj.blog = resBlog;
        resObj.status = "succeeded";
        console.log(resObj);
        return resObj;
    } catch (error) {
        console.error(error);
        resObj.status = "failed";
        console.log(resObj);
        return resObj;
    }
});
export const deleteblog = createAsyncThunk("bloglist/deleteBlog",async (blogId:string)=>{
    
    let resObj:{resBlogId:string, status:"idle" | "pending" | "succeeded" | "failed"} = {resBlogId: "", status:"idle"};
    try {
        await BlogsApi.deleteBlog(blogId);
        resObj.resBlogId = blogId;
        resObj.status = "succeeded";
        return resObj;
    } catch (error) {
        console.error(error);
        resObj.status = "failed";
        return resObj;
    }
});
const bloglistSlice = createSlice({
    name: "bloglist",
    initialState: initialBloglistState,
    reducers: {
        hideBlog(state, action){
            const ubl = state.BlogList.filter(blog=> blog._id !== action.payload);
                state.BlogList = ubl;
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchBlogs.fulfilled, (state, action)=>{
            return action.payload;
        })
        .addCase(addBlog.fulfilled, (state, action)=>{
            if(action.payload.blog){
                state.BlogList = [action.payload.blog, ...state.BlogList];
                state.status = action.payload.status;
            }
        })
        .addCase(updateBlog.fulfilled, (state, action)=>{
            const resBlog = action.payload.blog;
            if(resBlog){
                const updatedBlogs = state.BlogList.map(blog=>blog._id===resBlog._id ? resBlog : blog);
                console.log("here...");
                console.log(state.BlogList);
                state.BlogList = updatedBlogs;
                state.status = action.payload.status;
            }
        })
        .addCase(deleteblog.fulfilled, (state, action)=>{
            console.log("deleting blog...");
            const resBlogId = action.payload.resBlogId;
            if(resBlogId){
                const ubl = state.BlogList.filter(blog=> blog._id !== resBlogId);
                state.BlogList = ubl;
                state.status = action.payload.status;
            }
        })
    },
})

export default bloglistSlice.reducer
export const {hideBlog} = bloglistSlice.actions