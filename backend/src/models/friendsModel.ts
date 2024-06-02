import mongoose, { InferSchemaType, Schema, Types, model } from "mongoose";

export interface friendsInterface{
    userId : Types.ObjectId,
    // other future fields
}

export const friendsInterfaceSchema = new Schema<friendsInterface>({
    userId:{type:Schema.Types.ObjectId, required: true},
});

type Friends = InferSchemaType<typeof friendsInterfaceSchema>;
export default model<Friends>("Friends", friendsInterfaceSchema);