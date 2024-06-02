import { InferSchemaType, Schema, model } from "mongoose";
import { friendsInterfaceSchema } from "./friendsModel";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  password: { type: String, required: true, select: false },

  email: { type: String, select: false, default: "" },
  phone: { type: String, select: false, default: "" },
  gender: { type: String, select: false, default: "" },
  bio: { type: String, select: false, default: "" },
  country: { type: String, select: false, default: ""},
  proffesion: { type: String, select: false, default: "" },
  friends: { type: [friendsInterfaceSchema], select: false },
  friend_requests: { type: [friendsInterfaceSchema], select: false },
});

type User = InferSchemaType<typeof userSchema>;
export default model<User>("User", userSchema);
