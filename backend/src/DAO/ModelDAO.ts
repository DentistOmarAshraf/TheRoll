import BaseDAO from "./BaseDAO.js";
// Models
import {
  UserModel,
  UserLawyerModel,
  UserStudentModel,
} from "../models/user.js";
import { CityModel } from "../models/city.js";
import { NeighborhoodModel } from "../models/neighborhood.js";
import { UniversityModel } from "../models/university.js";

// Interfaces
import type {
  IBaseUserDTO,
  IBaseUserUpdateDTO,
  IUser,
  IStudentUser,
  ILawyerUser,
  IStudentUserDTO,
  ILawyerUserDTO,
  IStudentUserUpdateDTO,
  ILawyerUserUpdateDTO,
  IUserRelation,
  IStudentUserRelation,
  ILawyerUserRelation,
} from "../interfaces/user/IUser.js";
import type {
  ICityRelation,
  ICity,
  ICityDTO,
  ICityUpdateDTO,
} from "../interfaces/city/ICity.js";
import type {
  INeighborhood,
  INeighborhoodDTO,
  INeighborhoodUpdateDTO,
  INeighborhoodRelation,
} from "../interfaces/neighborhood/INeighborhood.js";
import type {
  IUniversity,
  IUniversityDTO,
  IUniversityRelation,
} from "../interfaces/university/IUniversity.js";
import type { IUniversityUpdateDTO } from "../interfaces/university/IUniversity.js";

export const UserDAO = new BaseDAO<
  IUser,
  IBaseUserDTO,
  IBaseUserUpdateDTO,
  IUserRelation
>(UserModel);

export const UserStudentDAO = new BaseDAO<
  IStudentUser,
  IStudentUserDTO,
  IStudentUserUpdateDTO,
  IStudentUserRelation
>(UserStudentModel);

export const UserLawyerDAO = new BaseDAO<
  ILawyerUser,
  ILawyerUserDTO,
  ILawyerUserUpdateDTO,
  ILawyerUserRelation
>(UserLawyerModel);

export const CityDAO = new BaseDAO<
  ICity,
  ICityDTO,
  ICityUpdateDTO,
  ICityRelation
>(CityModel);

export const NeighborhoodDAO = new BaseDAO<
  INeighborhood,
  INeighborhoodDTO,
  INeighborhoodUpdateDTO,
  INeighborhoodRelation
>(NeighborhoodModel);

export const UniversityDAO = new BaseDAO<
  IUniversity,
  IUniversityDTO,
  IUniversityUpdateDTO,
  IUniversityRelation
>(UniversityModel);
