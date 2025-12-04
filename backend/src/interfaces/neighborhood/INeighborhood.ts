import type { Types } from "mongoose";
import type { IBase } from "../IBase.js";
import type { ICity } from "../city/ICity.js";

export interface INeighborhood extends IBase {
  city: Types.ObjectId | ICity;
  name: string;
  policeName: string;
}

export interface INeighborhoodDTO {
  city: Types.ObjectId | ICity;
  name: string;
  policeName: string;
}

export interface INeighborhoodUpdateDTO {
  name?: string;
  policeName: string;
}
