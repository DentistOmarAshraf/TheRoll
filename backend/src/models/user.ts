import mongoose, { Schema, Types, Model } from "mongoose";
import type { IUser } from "../interfaces/user/IUser.js";
import { EMAIL_REGEX, PHONE_REGEX } from "../utils/regexConstants.js";

const userSchema = new Schema<IUser>(
  {
    type: {
      type: String,
      enum: ["Student", "Lawyer"],
      required: [true, "User Type must be Student or Lawyer"],
    },
    fullName: {
      type: String,
      required: [true, "fullName can't be Blank."],
    },
    email: {
      type: String,
      required: [true, "E-mail can't be Blank"],
      unique: [true, "E-mail is already there"],
      match: [EMAIL_REGEX, "Please enter a valid email address."],
    },
    password: {
      type: String,
      required: [true, "Password can't be Blank"],
    },
    phone: {
      type: String,
      required: [true, "Phone number can't be Blank"],
      match: [PHONE_REGEX, "Please enter a valid phone number"],
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    syndicateId: {
      type: String,
      required: false,
    },
    city: {
      type: Types.ObjectId,
      required: [true, "City id is required"],
    },
    neighborhood: {
      types: Types.ObjectId,
      required: [true, "Neighborhood id is required"],
    },
    university: {
      types: Types.ObjectId,
      required: false,
    },
    grade: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const UserModel: Model<IUser> = mongoose.model("User", userSchema);
