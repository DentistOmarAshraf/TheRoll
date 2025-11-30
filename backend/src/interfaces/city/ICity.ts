import type { Types } from "mongoose";
import type { INeighborhood } from "../neighborhood/INeighborhood.js";
import type { IUniversity } from "../university/IUniversity.js";

export interface ICity {
  _id: Types.ObjectId;
  name: string;
  neighborhoods: (Types.ObjectId | INeighborhood)[];
  universities: (Types.ObjectId | IUniversity)[];
}

export interface ICityDTO {
  name: string,
}