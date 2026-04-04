import { Schema, model, models } from "mongoose";
import { USER_ROLES } from "@/lib/constants";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: USER_ROLES,
      default: "teacher",
      required: true,
    },
  },
  { timestamps: true },
);

export const UserModel = models.User ?? model("User", userSchema);
