import { NeighborhoodModel } from "../models/neighborhood.js";
import type {
  INeighborhood,
  INeighborhoodDTO,
} from "../interfaces/neighborhood/INeighborhood.js";
import type { UpdateQuery } from "mongoose";

/**
 * Data Access Object of Neighborhood
 */
export default class NeighborhoodDAO {
  // Create
  static async create(data: INeighborhoodDTO): Promise<INeighborhood> {
    const neighborhood = await NeighborhoodModel.create(data);
    return neighborhood.toObject();
  }

  // Read
  static async getById(id: string): Promise<INeighborhood | null> {
    const result = await NeighborhoodModel.findById(id).lean().exec();
    return result;
  }

  static async getByCityId(id: string): Promise<INeighborhood[]> {
    const result = await NeighborhoodModel.find({ city: id }).lean().exec();
    return result;
  }

  static async getNeighborhoods(
    page: number,
    limit: number
  ): Promise<INeighborhood[]> {
    const start = (page - 1) * limit;
    const result = await NeighborhoodModel.find()
      .skip(start)
      .limit(limit)
      .lean()
      .exec();
    return result;
  }

  // Update
  static async updateById(
    id: string,
    data: Partial<INeighborhoodDTO>
  ): Promise<INeighborhood | null> {
    const result = await NeighborhoodModel.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();
    return result ? result.toObject() : null;
  }

  static async atomicUpdate(
    id: string,
    data: UpdateQuery<INeighborhood>
  ): Promise<void> {
    await NeighborhoodModel.findByIdAndUpdate(id, data).exec();
  }

  // Delete
  static async delete(id: string): Promise<boolean> {
    const result = await NeighborhoodModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
