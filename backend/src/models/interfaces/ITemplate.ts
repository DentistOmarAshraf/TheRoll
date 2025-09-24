import type { Types, Document } from "mongoose";
import type { ISections } from "./ISections.js";
import type { IField } from "./IField.js";

export interface ITemplate extends Document {
  _id: Types.ObjectId,
  section: Types.ObjectId | ISections,
  title: string,
  intro?: string,
  middle?: string,
  final?: string,
  summary?: string,
  fields: (Types.ObjectId) | IField,
  tags?: [{type: string}],
  verbs?: Map<string, { male: string; female: string }>;
}