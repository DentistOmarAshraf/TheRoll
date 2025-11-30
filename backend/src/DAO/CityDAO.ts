import { CityModel } from "../models/city.js";
import type { ICity, ICityDTO } from "../interfaces/city/ICity.js";

/**
 * Data Access Object of City
 */
export default class CityDAO {
  // Create
  static async create(cityData: ICityDTO): Promise<ICity> {
    const city = await CityModel.create(cityData);
    return city;
  }

  // Read
  static async getById(id: string): Promise<ICity | null> {
    const city = await CityModel.findById(id);
    return city;
  }

  static async getCities(page: number, limit: number): Promise<ICity[] | null> {
    const start = (page - 1) * limit;
    const result = await CityModel.find().skip(start).limit(limit);
    return result;
  }

  // Update
  static async updateById(id: string, data: Partial<ICityDTO>) {
    const updateded = await CityModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updateded;
  }

  // Delete
  static async deleteById(id: string) {
    const result = await CityModel.findByIdAndDelete(id);
    return !!result;
  }
}
