import mongoose, { Schema, Types, Model } from "mongoose";
import type {
  ILawyerUser,
  IStudentUser,
  IUser,
} from "../interfaces/user/IUser.js";
import { EMAIL_REGEX, PHONE_REGEX } from "../utils/regexConstants.js";

const userSchema = new Schema<IUser>(
  {
    type: {
      type: String,
      enum: ["Student", "Lawyer"],
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
      immutable: true,
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
    city: {
      type: Types.ObjectId,
      required: [true, "City id is required"],
    },
    neighborhood: {
      type: Types.ObjectId,
      required: [true, "Neighborhood id is required"],
    },
  },
  { timestamps: true, discriminatorKey: "type" }
);

const studentSchema = new Schema<IStudentUser>({
  university: {
    type: Types.ObjectId,
    required: [true, "University is required"],
  },
  grade: {
    type: String,
    required: [true, "Grade is required"],
  },
});

const lawyerSchema = new Schema<ILawyerUser>({
  syndicateId: {
    type: String,
    required: [true, "Syndicate Id is missing"],
  },
});

export const UserModel: Model<IUser> = mongoose.model("User", userSchema);

export const UserStudentModel: Model<IStudentUser> = UserModel.discriminator(
  "Student",
  studentSchema,
  "Student"
);

export const UserLawyerModel: Model<ILawyerUser> = UserModel.discriminator(
  "Lawyer",
  lawyerSchema,
  "Lawyer"
);
