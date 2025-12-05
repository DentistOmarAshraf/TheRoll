import type { Types } from "mongoose";
import type { IBase } from "../IBase.js";
import type { INeighborhood } from "../neighborhood/INeighborhood.js";
import type { IUniversity } from "../university/IUniversity.js";

export interface ICity extends IBase {
  name: string;
  neighborhoods: (Types.ObjectId | INeighborhood)[];
  universities: (Types.ObjectId | IUniversity)[];
}

export interface ICityDTO {
  name: string;
}

export interface ICityUpdateDTO {
  name: string;
}

export type ICityRelation = "neighborhoods" | "universities";
