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
} from "../interfaces/user/IUser.js";
import type {
  ICity,
  ICityDTO,
  ICityUpdateDTO,
} from "../interfaces/city/ICity.js";
import type {
  INeighborhood,
  INeighborhoodDTO,
  INeighborhoodUpdateDTO,
} from "../interfaces/neighborhood/INeighborhood.js";
import type {
  IUniversity,
  IUniversityDTO,
} from "../interfaces/university/IUniversity.js";
import type { IUniversityUpdateDTO } from "../interfaces/university/IUniversity.js";

export const UserDAO = new BaseDAO<IUser, IBaseUserDTO, IBaseUserUpdateDTO>(
  UserModel
);

export const UserStudentDAO = new BaseDAO<
  IStudentUser,
  IStudentUserDTO,
  IStudentUserUpdateDTO
>(UserStudentModel);

export const UserLawyerDAO = new BaseDAO<
  ILawyerUser,
  ILawyerUserDTO,
  ILawyerUserUpdateDTO
>(UserLawyerModel);

export const CityDAO = new BaseDAO<ICity, ICityDTO, ICityUpdateDTO>(CityModel);

export const NeighborhoodDAO = new BaseDAO<
  INeighborhood,
  INeighborhoodDTO,
  INeighborhoodUpdateDTO
>(NeighborhoodModel);

export const UniversityDAO = new BaseDAO<
  IUniversity,
  IUniversityDTO,
  IUniversityUpdateDTO
>(UniversityModel);
