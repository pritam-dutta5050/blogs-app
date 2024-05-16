import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {type:String, required: true, unique:true},
    firstName: {type:String, required: true},
    lastName: {type:String},
    password: {type:String, required: true, select:false},
});

type User = InferSchemaType<typeof userSchema>;
export default model<User>("User", userSchema);