import { NeighborhoodDAO, CityDAO } from "../DAO/ModelDAO.js";
import type {
  INeighborhood,
  INeighborhoodDTO,
  INeighborhoodUpdateDTO,
  // INeighborhoodUpdateDTO,
} from "../interfaces/neighborhood/INeighborhood.js";
import BadRequestError from "../errors/BadRequestError.js";
import mongoose, { isValidObjectId, Types } from "mongoose";

export default class NeighborhoodServices {
  // C
  static async createNeighborhood(
    obj: INeighborhoodDTO
  ): Promise<INeighborhood | null> {
    const { city, name, policeName } = obj;
    const chkCity = await CityDAO.getById(city.toString());
    if (!chkCity) throw new BadRequestError("City not found");
    const ci_id = new Types.ObjectId(city);

    const session = await mongoose.startSession();
    try {
      await session.startTransaction();
      const neighborhood = await NeighborhoodDAO.create(
        {
          city: ci_id,
          name,
          policeName,
        },
        session
      );
      const updated = await CityDAO.atomicUpdate(
        city.toString(),
        {
          $push: { neighborhoods: neighborhood },
        },
        session
      );
      if (!updated) {
        throw new BadRequestError("City is not updated");
      }
      await session.commitTransaction();
      return neighborhood ? neighborhood : null;
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      await session.endSession();
    }
  }

  // R
  static async getNeighborhoodsOfCity(
    cityId: string,
    page = 1,
    limit = 50
  ): Promise<INeighborhood[]> {
    const query = await CityDAO.getById(cityId);
    if (!query) throw new BadRequestError("City Id is incorrect");
    const list = await NeighborhoodDAO.getListByQuery(
      { city: cityId },
      page,
      limit
    );
    return list;
  }

  // U
  static async updateNeighborhood(obj: INeighborhoodUpdateDTO) {
    const { _id } = obj;
    if (!isValidObjectId(_id)) throw new BadRequestError("Invlid ID");
    const session = await mongoose.startSession();
    try {
      await session.startTransaction();
      const updated = await NeighborhoodDAO.updateById(_id, obj, session);
      if (!updated) throw new BadRequestError("Neighborhood Not found");
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
  static async deleteNeighborhood(neId: string) {
    const neighborhood = await NeighborhoodDAO.getById(neId);
    if (!neighborhood) throw new BadRequestError("Neighborhood Not Found");
    const session = await mongoose.startSession();
    try {
      await session.startTransaction();
      const deleted = await NeighborhoodDAO.deleteById(neId, session);
      if (!deleted) throw new BadRequestError("Neighborhood not found");
      await CityDAO.atomicUpdate(
        neighborhood.city._id,
        {
          $pull: { neighborhoods: neighborhood._id },
        },
        session
      );
      await session.commitTransaction();
      return deleted;
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      await session.endSession;
    }
  }
}
