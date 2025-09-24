import mongoose, { Schema, Types } from "mongoose";
import type { Model } from "mongoose";
import type { ITemplate } from "../interfaces/ITemplate.js";

const templateSchema = new Schema<ITemplate>({
  section: { type: Types.ObjectId, ref: "Sections", required: true },
  title: { type: String, required: true },
  intro: String,
  middle: String,
  final: String,
  summary: String,
  fields: [{ type: Types.ObjectId, ref: "Fields", required: true }],
  tags: [String],
  verbs: {
    type: Map,
    of: new Schema({ male: String, female: String }, { _id: false }),
  },
});

export const Templates: Model<ITemplate> = mongoose.model(
  "Templates",
  templateSchema
);
