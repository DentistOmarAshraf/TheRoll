import type { Types } from "mongoose";
import type { IBase } from "../IBase.js";
import type { ICity } from "../city/ICity.js";

export interface IUniversity extends IBase {
  city: Types.ObjectId | ICity;
  name: string;
}

export interface IUniversityDTO {
  city: string | Types.ObjectId | ICity;
  name: string;
}

export interface IUniversityUpdateDTO {
  _id: string;
  name?: string;
}

export type IUniversityRelation = "city";
