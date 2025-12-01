import { CityModel } from "../models/city.js";
import type { ICity, ICityDTO } from "../interfaces/city/ICity.js";
import type { UpdateQuery } from "mongoose";

/**
 * Data Access Object of City
 */
export default class CityDAO {
  // Create
  static async create(cityData: ICityDTO): Promise<ICity> {
    const city = await CityModel.create(cityData);
    return city.toObject();
  }

  // Read
  static async getById(id: string): Promise<ICity | null> {
    const city = await CityModel.findById(id).lean().exec();
    return city;
  }

  static async getCities(page: number, limit: number): Promise<ICity[]> {
    const start = (page - 1) * limit;
    const result = await CityModel.find()
      .skip(start)
      .limit(limit)
      .lean()
      .exec();
    return result;
  }

  // Update
  static async updateById(
    id: string,
    data: Partial<ICity>
  ): Promise<ICity | null> {
    const updated = await CityModel.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();
    return updated ? updated?.toObject() : null;
  }

  static async atomicUpdate(
    id: string,
    data: UpdateQuery<ICity>
  ): Promise<void> {
    await CityModel.findByIdAndUpdate(id, data).exec();
  }

  // Delete
  static async deleteById(id: string): Promise<boolean> {
    const result = await CityModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
