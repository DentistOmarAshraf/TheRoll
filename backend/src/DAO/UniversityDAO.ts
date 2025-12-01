import { UniversityModel } from "../models/university.js";
import type {
  IUniversity,
  IUniversityDTO,
} from "../interfaces/university/IUniversity.js";
import type { UpdateQuery } from "mongoose";

export default class UniversityDAO {
  // Create
  static async create(data: IUniversityDTO): Promise<IUniversity> {
    if ("_id" in data) delete data._id;
    const university = await UniversityModel.create(data);
    return university.toObject();
  }

  // Read
  static async getById(id: string): Promise<IUniversity | null> {
    const university = await UniversityModel.findById(id).lean().exec();
    return university;
  }

  static async getUniversities(
    page: number,
    limit: number
  ): Promise<IUniversity[]> {
    const start = (page - 1) * limit;
    const result = await UniversityModel.find()
      .skip(start)
      .limit(limit)
      .lean()
      .exec();
    return result;
  }

  // Update
  static async updateById(
    id: string,
    data: Partial<IUniversityDTO>
  ): Promise<IUniversity | null> {
    if ("_id" in data) delete data._id;
    const updated = await UniversityModel.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();
    return updated ? updated?.toObject() : null;
  }

  static async atomicUpdate(
    id: string,
    data: UpdateQuery<IUniversity>
  ): Promise<void> {
    await UniversityModel.findByIdAndUpdate(id, data).exec();
  }

  // Delete
  static async deleteById(id: string): Promise<boolean> {
    const result = await UniversityModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
