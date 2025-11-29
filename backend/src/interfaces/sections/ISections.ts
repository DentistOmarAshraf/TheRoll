import type { Types, Document } from "mongoose";

export interface ISections extends Document {
  _id: Types.ObjectId,
  name: string
}

export interface ISectionsDTO {
  name: string;
}