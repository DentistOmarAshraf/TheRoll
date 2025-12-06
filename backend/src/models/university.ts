import mongoose, { Schema, Types } from "mongoose";
import type { Model } from "mongoose";
import type { IUniversity } from "../interfaces/university/IUniversity.js";

const universitySchema = new Schema<IUniversity>(
  {
    name: {
      type: String,
      required: [true, "University Name is required"],
      unique: [true, "University Name is unique"],
    },
    city: {
      type: Types.ObjectId,
      ref: "City",
      required: [true, "City Id or City Name is required"],
    },
  },
  { timestamps: true }
);

export const UniversityModel: Model<IUniversity> = mongoose.model(
  "University",
  universitySchema
);
