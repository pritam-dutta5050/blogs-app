import { InferSchemaType, Schema, model } from "mongoose";
import { commentInterfaceSchema } from "./commentModel";


const blogSchema = new Schema({
    userId: {type:Schema.Types.ObjectId, required: true},
    blogTitle: {type:String, required: true},
    blogContent: {type:String},
    likes: {type:[Schema.Types.ObjectId]},
    comments: {type: [commentInterfaceSchema]}
}, {timestamps:true});

type Blog = InferSchemaType<typeof blogSchema>;
export default model<Blog>("Blog", blogSchema);

