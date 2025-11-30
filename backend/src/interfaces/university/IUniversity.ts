import type { Types } from "mongoose";
import type { ICity } from "../city/ICity.js";

export interface IUniversity {
  _id: Types.ObjectId;
  city: Types.ObjectId | ICity;
  name: string;
}
