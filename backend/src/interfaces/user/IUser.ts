import type { Types } from "mongoose";
import type { IUniversity } from "../university/IUniversity.js";
import type { ICity } from "../city/ICity.js";
import type { INeighborhood } from "../neighborhood/INeighborhood.js";

interface IBaseUser {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  isConfirmed: boolean;
  city: Types.ObjectId | ICity;
  neighborhood: Types.ObjectId | INeighborhood;
  offices?: Types.ObjectId[]; // must be changed after creating office
}

export interface IStudentUser extends IBaseUser {
  type: "Student";
  university: Types.ObjectId | IUniversity;
  grade: string;
  syndicateId?: never;
}

export interface ILawyerUser extends IBaseUser {
  type: "Lawyer";
  syndicateId: string;
  university?: never;
  grade?: never;
}

export type IUser = IStudentUser | ILawyerUser;
