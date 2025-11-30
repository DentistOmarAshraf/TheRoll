import mongoose, { Schema, Types, Model } from "mongoose";
import type { ICity } from "../interfaces/city/ICity.js";

const citySchema = new Schema<ICity>(
  {
    name: {
      type: String,
      required: [true, "City Name is Requierd"],
    },
    neighborhoods: [
      { type: Types.ObjectId, ref: "Neighborhood", select: false },
    ],
    universities: [{ type: Types.ObjectId, ref: "University", select: false }],
  },
  { timestamps: true }
);

export const CityModel: Model<ICity> = mongoose.model("City", citySchema);
