import mongoose, { InferSchemaType, Schema, Types, model } from "mongoose";

export interface commentInterface{
    commentText : string,
    commentBy : Types.ObjectId,
}

export const commentInterfaceSchema = new Schema<commentInterface>({
    commentText:{type:String, required: true},
    commentBy:{type:Schema.Types.ObjectId, required: true},
},{timestamps: true});

type Comment = InferSchemaType<typeof commentInterfaceSchema>;
export default model<Comment>("Comment", commentInterfaceSchema);