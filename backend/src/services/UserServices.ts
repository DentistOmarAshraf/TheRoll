import { v4 as uuid4 } from "uuid";
import BaseDAO from "../DAO/BaseDAO.js";
import CasheServices from "./CacheServices.js";
import {
  UniversityDAO,
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
  IUser,
  IBaseUserUpdateDTO,
} from "../interfaces/user/IUser.js";
import mongoose, { isValidObjectId } from "mongoose";
import ServerError from "../errors/ServerError.js";
import NotFoundError from "../errors/NotFoundError.js";
import {
  SendConfirmEmail,
  SendForgetPassEmail,
} from "../workers/email/EmailProducer.js";
import bcrypt from "bcrypt";

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
  private static ConfirmToken = "user-confirm";
  private static FrogetToken = "user-froget";

  // R
  static async checkUserPass(
    obj: Pick<IUser, "email" | "password">
  ): Promise<boolean> {
    const { email, password } = obj;

    const user = await UserDAO.getOneByQuery({ email });
    if (!user) throw new BadRequestError("Email is not registered");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new BadRequestError("Password is incorrect");
    return isValid;
  }

  static async reRequestConfirm(obj: Pick<IUser, "email">) {
    const user = await UserDAO.getOneByQuery(obj);
    if (!user) throw new NotFoundError("Email is not Registered");
    if (user.isConfirmed) throw new BadRequestError("Email is confirmed");
    const token = uuid4();
    await CasheServices.setData(
      this.ConfirmToken,
      token,
      user._id.toString(),
      120
    );
    try {
      await SendConfirmEmail({
        userEmail: user.email,
        userName: user.fullName,
        token,
      });
      return true;
    } catch (e) {
      throw new ServerError(`${e}`);
    }
  }

  static async requestRestToken(obj: Pick<IUser, "email">) {
    const { email } = obj;

    const user = await UserDAO.getOneByQuery({ email });
    if (!user) throw new NotFoundError("Email is not registered");
    if (!user.isConfirmed) throw new BadRequestError("Email is not confirmed");

    try {
      const token = uuid4();
      await CasheServices.setData(
        this.FrogetToken,
        token,
        user._id.toString(),
        120
      );
      SendForgetPassEmail({ userEmail: email, token });
      return true;
    } catch (e) {
      throw new ServerError(`${e}`);
    }
  }

  // C

  // NEED TO VALIDATE ACCORDONG TO USER TYPE
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
      throw new BadRequestError(
        "البريد الإلكتروني مسجل بالفعل"
      );
    if (
      data.type == "Student" &&
      !(await UniversityDAO.getById(data.university))
    )
      throw new BadRequestError("University not Found");

    // will add logic to check photoId upload by AWS S3

    const session = await mongoose.startSession();
    try {
      await session.startTransaction();
      const user = await DAO.create(data, session);
      if (!user) throw new ServerError("User is not created");
      const token = uuid4();
      const ok = await CasheServices.setData(
        this.ConfirmToken,
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

  // U
  static async confirmUser(obj: { token: string }): Promise<IUser> {
    const { token } = obj;
    const userId = await CasheServices.getData(this.ConfirmToken, token);
    if (!userId) throw new BadRequestError("الرابط غير صالح او منتهي الصلاحيه");

    const session = await mongoose.startSession();
    try {
      await session.startTransaction();
      const updated = await UserDAO.atomicUpdate(
        userId,
        {
          $set: { isConfirmed: true },
        },
        session
      );
      if (!updated) throw new NotFoundError("User Not Found");
      await CasheServices.deleteKey(this.ConfirmToken, token);
      await session.commitTransaction();
      return updated as unknown as IUser;
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      await session.endSession();
    }
  }

  // U
  static async updateUser<T extends keyof UserUpdateDTO>(
    id: string,
    data: IBaseUserUpdateDTO
  ): Promise<UserModelMap[T]> {
    const user = await UserDAO.getById(id);
    if (!user) throw new NotFoundError("لم نجد مستخدم");
    if (!user.isConfirmed)
      throw new BadRequestError("يجب تأكيد البريد الالكتروني");
    const session = await mongoose.startSession();
    try {
      await session.startTransaction();
      const updated = await UserDAO.updateById(id, data, session);
      if (!updated) throw new NotFoundError("User Not Found");
      await session.commitTransaction();
      return updated as any;
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      await session.endSession();
    }
  }

  static async transitionStudentToLawyer(data: {
    id: string;
    syndicateId: string;
  }) {
    const { id, syndicateId } = data;
    const user = await UserDAO.getById(id);
    if (!user) throw new NotFoundError("User Not Found");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, photoId, university, ...rest } = user;
    const newLawyer = { ...rest, syndicateId, type: "Lawyer" };

    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const result = await UserDAO.replace(id, newLawyer, session);
      if (result.modifiedCount == 0)
        throw new ServerError("something went wrong");
      await session.commitTransaction();
      return await UserDAO.getById(id);
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      session.endSession();
    }
  }

  static async resetPassword(obj: { token: string; password: string }) {
    const { token, password } = obj;
    const userId = await CasheServices.getData(this.FrogetToken, token);
    if (!userId) throw new BadRequestError("Token is wrong");

    const session = await mongoose.startSession();
    try {
      await session.startTransaction();
      const updated = await UserDAO.updateById(
        userId,
        { password } as IBaseUserUpdateDTO,
        session
      );
      if (!updated) throw new NotFoundError("user Not Found");
      await CasheServices.deleteKey(this.FrogetToken, token);
      await session.commitTransaction();
      return updated;
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      await session.endSession();
    }
  }

  // D
  static async deleteUser(dt: Pick<IUser, "_id">) {
    const { _id } = dt;
    if (!isValidObjectId(_id)) throw new BadRequestError("Invalid ID Format");
    const result = await UserDAO.deleteById(_id.toString());
    if (!result) throw new NotFoundError("User Not found");
    return result;
  }
}
