import type { Types } from "mongoose";
import type { IBase } from "../IBase.js";
import type { ICity } from "../city/ICity.js";

export interface IUniversity extends IBase {
  city: Types.ObjectId | ICity;
  name: string;
}
