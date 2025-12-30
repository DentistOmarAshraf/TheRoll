import { CityDAO, UniversityDAO } from "../DAO/ModelDAO.js";
import type {
  IUniversity,
  IUniversityDTO,
  // IUniversityUpdateDTO,
} from "../interfaces/university/IUniversity.js";
import BadRequestError from "../errors/BadRequestError.js";
// import NotFoundError from "../errors/NotFoundError.js";
import mongoose, { isValidObjectId } from "mongoose";
import type { INeighborhoodUpdateDTO } from "../interfaces/neighborhood/INeighborhood.js";

export default class UniversityServices {
  // C
  static async createUniversity(obj: IUniversityDTO) {
    const { city, name } = obj;
    const chkCity = await CityDAO.getById(city as string);
    if (!chkCity) throw new BadRequestError("City Id is incorrect");
    const query = await UniversityDAO.getOneByQuery({ name });
    if (query) throw new BadRequestError("University name must be unique");

    const session = await mongoose.startSession();
    try {
      await session.startTransaction();
      const university = await UniversityDAO.create(
        {
          city: chkCity._id,
          name,
        },
        session
      );
      const updatedCity = await CityDAO.atomicUpdate(
        city as string,
        { $push: { universities: university } },
        session
      );
      if (!updatedCity) throw new BadRequestError("City is not updated");
      await session.commitTransaction();
      return university;
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      await session.endSession();
    }
  }

  // R
  static async getAllUniversities(
    page = 1,
    limit = 50
  ): Promise<IUniversity[]> {
    const universities = await UniversityDAO.getList(page, limit);
    return universities;
  }

  static async getUniversitiesOfCity(
    cityId: string,
    page = 1,
    limit = 50
  ): Promise<IUniversity[]> {
    const query = await CityDAO.getById(cityId);
    if (!query) throw new BadRequestError("City id is incorrect");
    const list = await UniversityDAO.getListByQuery(
      { city: cityId },
      page,
      limit
    );
    return list;
  }

  // U
  static async updateUniversity(obj: INeighborhoodUpdateDTO) {
    const { _id } = obj;
    if (!isValidObjectId(_id)) throw new BadRequestError("Invalid ID");
    const session = await mongoose.startSession();
    try {
      await session.startTransaction();
      const updated = await UniversityDAO.updateById(_id, obj, session);
      if (!updated) throw new BadRequestError("University Not Found");
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
  static async deleteUniversity(uniId: string) {
    const university = await UniversityDAO.getById(uniId);
    if (!university) throw new BadRequestError("University not Found");
    const session = await mongoose.startSession();
    try {
      await session.startTransaction();
      const deleted = await UniversityDAO.deleteById(uniId, session);
      if (!deleted) throw new BadRequestError("University not found");
      const citychk = await CityDAO.atomicUpdate(
        university.city._id,
        { $pull: { universities: university._id } },
        session
      );
      if (!citychk) throw new BadRequestError("City not found");
      await session.commitTransaction();
      return deleted;
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      await session.endSession();
    }
  }
}
