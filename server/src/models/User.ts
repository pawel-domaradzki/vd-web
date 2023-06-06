import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/shared";

const UserSchema: Schema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    bookmarks: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
