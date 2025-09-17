import mongoose, { Schema } from "mongoose";
import type { Model } from "mongoose";
import type { ISubField, IField } from "../interfaces/IField.ts";

const SubFieldSchema = new Schema<ISubField>({
  name: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, required: true },
  option: [{ type: String }],
});

const FieldSchema = new Schema<IField>({
  name: { type: String, required: true },
  legend: { type: String, required: true },
  repet: { type: Boolean, required: true },
  sub: [SubFieldSchema], // embedded array of subfields
});

export const Fields: Model<IField> = mongoose.model<IField>(
  "Fields",
  FieldSchema
);
