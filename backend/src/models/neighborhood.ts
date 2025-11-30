import mongoose, { Schema, Types } from "mongoose";
import { type Model } from "mongoose";
import type { INeighborhood } from "../interfaces/neighborhood/INeighborhood.js";

const neighborhoodSchema = new Schema<INeighborhood>(
  {
    name: {
      type: String,
      required: [true, "Neighborhood Name is Requierd"],
    },
    policeName: {
      type: String,
      required: [true, "Police Name is required"],
    },
    city: {
      type: Types.ObjectId,
      ref: "City",
      required: [true, "City Id or city Object is required"],
    },
  },
  { timestamps: true }
);

export const NeighborhoodModel: Model<INeighborhood> = mongoose.model(
  "Neighborhood",
  neighborhoodSchema
);
