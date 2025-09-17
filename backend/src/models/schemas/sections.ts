import mongoose, { Schema } from "mongoose";
import type { Model } from "mongoose";
import type { ISections } from "../interfaces/ISections.js";

const sectionsSchema = new Schema<ISections>({
  name: { type: String, required: true },
});

export const Sections: Model<ISections> = mongoose.model<ISections>(
  "Sections",
  sectionsSchema
);
