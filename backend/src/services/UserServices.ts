import { v4 as uuid4 } from "uuid";
import BaseDAO from "../DAO/BaseDAO.js";
import CashServices from "./CacheServices.js";
import {
  CityDAO,
  NeighborhoodDAO,
  UserDAO,
  UserLawyerDAO,
  UserStudentDAO,
} from "../DAO/ModelDAO.js";
import BadRequestError from "../errors/BadRequestError.js";
import type {
  IStudentUser,
  ILawyerUser,
  IStudentUserDTO,
  ILawyerUserDTO,
  IStudentUserUpdateDTO,
  ILawyerUserUpdateDTO,
  IStudentUserRelation,
  ILawyerUserRelation,
} from "../interfaces/user/IUser.js";
import mongoose from "mongoose";
import ServerError from "../errors/ServerError.js";
import { SendConfirmEmail } from "../workers/email/EmailProducer.js";

type UserDTOMap = {
  Student: IStudentUserDTO;
  Lawyer: ILawyerUserDTO;
};

type UserModelMap = {
  Student: IStudentUser;
  Lawyer: ILawyerUser;
};

type UserUpdateDTO = {
  Student: IStudentUserUpdateDTO;
  Lawyer: ILawyerUserUpdateDTO;
};

type UserRelationMap = {
  Student: IStudentUserRelation;
  Lawyer: ILawyerUserRelation;
};

export default class UserServices {
  private static userTypeDAO = {
    Lawyer: UserLawyerDAO,
    Student: UserStudentDAO,
  };

  // C
  static async createUser<T extends keyof UserDTOMap>(
    data: UserDTOMap[T]
  ): Promise<UserModelMap[T]> {
    const DAO = this.userTypeDAO[data.type] as unknown as BaseDAO<
      UserModelMap[T],
      UserDTOMap[T],
      UserUpdateDTO[T],
      UserRelationMap[T]
    >;
    if (await UserDAO.getOneByQuery({ email: data.email }))
      throw new BadRequestError("Email exists");
    if (!(await CityDAO.getById(data.city as string)))
      throw new BadRequestError("City Id is incorrect");
    if (!(await NeighborhoodDAO.getById(data.neighborhood as string)))
      throw new BadRequestError("Neighborhood not found");

    const session = await mongoose.startSession();
    try {
      await session.startTransaction();
      const user = await DAO.create(data, session);
      if (!user) throw new ServerError("User is not created");
      const token = uuid4();
      const ok = await CashServices.setData(
        "user",
        token,
        user._id.toString(),
        120
      );
      if (!ok) throw new ServerError("Token Error");
      await SendConfirmEmail({
        userEmail: user.email,
        userName: user.fullName,
        token,
      });
      await session.commitTransaction();
      return user;
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      session.endSession();
    }
  }
}
