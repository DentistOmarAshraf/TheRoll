import type { Types } from "mongoose";
import type { IBase } from "../IBase.js";
import type { ICity } from "../city/ICity.js";

export interface INeighborhood extends IBase {
  city: Types.ObjectId | ICity;
  name: string;
  policeName: string;
}

export interface INeighborhoodDTO {
  city: string | Types.ObjectId;
  name: string;
  policeName: string;
}

export interface INeighborhoodUpdateDTO {
  _id: string;
  name?: string;
  policeName?: string;
}

export type INeighborhoodRelation = "city";
