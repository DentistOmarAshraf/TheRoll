import type { Types, Document } from "mongoose";

export interface ISubField extends Document {
  _id: Types.ObjectId
  name: string;
  type: string;
  label: string;
  option?: [string];
}

export interface IField extends Document {
  _id: Types.ObjectId
  name: string;
  legend: string;
  repet: boolean;
  sub: ISubField[];
}

export interface ISubFieldDTO {
  name: string;
  type: string;
  label: string;
  option?: string[];
}

export interface IFieldDTO {
  name: string;
  legend: string;
  repet: boolean;
  sub: ISubFieldDTO[];
}