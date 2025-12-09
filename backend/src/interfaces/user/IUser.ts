import type { Types } from "mongoose";
import type { IUniversity } from "../university/IUniversity.js";
import type { ICity } from "../city/ICity.js";
import type { INeighborhood } from "../neighborhood/INeighborhood.js";
import type { IBase } from "../IBase.js";

interface IBaseUser extends IBase {
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

export interface IBaseUserDTO {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  city: string | Types.ObjectId;
  neighborhood: string | Types.ObjectId;
  offices?: Types.ObjectId[];
}

export interface IStudentUserDTO extends IBaseUserDTO {
  type: "Student";
  university: string | Types.ObjectId;
  grade: string;
  syndicateId?: never;
}

export interface ILawyerUserDTO extends IBaseUserDTO {
  type: "Lawyer";
  syndicateId: string;
  university?: never;
  grade?: never;
}

export type IBaseUserUpdateDTO = Partial<
  Omit<IBaseUserDTO, "email" | "password">
>;

export interface IStudentUserUpdateDTO extends IBaseUserUpdateDTO {
  university?: Types.ObjectId | IUniversity; // Optional fields
  grade?: string;
  syndicateId?: undefined;
}

export interface ILawyerUserUpdateDTO extends IBaseUserUpdateDTO {
  syndicateId?: string;
  university?: undefined;
  grade?: undefined;
}

export type IUser = IStudentUser | ILawyerUser;

export type IUserRelation = "city" | "neighborhood" | "offices";

export type ILawyerUserRelation = IUserRelation;

export type IStudentUserRelation = IUserRelation | "university";
