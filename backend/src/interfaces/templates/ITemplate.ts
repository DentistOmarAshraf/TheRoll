import type { Types, Document } from "mongoose";
import type { ISections } from "../sections/ISections.js";
import type { IField } from "../fields/IField.js";

export interface ITemplate extends Document {
  _id: Types.ObjectId;
  section: Types.ObjectId | ISections;
  title: string;
  intro?: string;
  middle?: string;
  final?: string;
  summary?: string;
  fields: (Types.ObjectId | IField)[];
  tags?: [{ type: string }];
  verbs?: { [key: string]: { male: string; female: string } };
}

export interface ITemplateDTO {
  section: Types.ObjectId;
  title: string;
  intro?: string;
  middle?: string;
  final?: string;
  summary?: string;
  fields: Types.ObjectId[];
  tags?: string[];
  verbs?: { [key: string]: { male: string; female: string } };
}
