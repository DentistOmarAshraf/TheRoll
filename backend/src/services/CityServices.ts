import { CityDAO } from "../DAO/ModelDAO.js";
import type {
  ICity,
  ICityDTO,
  ICityUpdateDTO,
} from "../interfaces/city/ICity.js";
import BadRequestError from "../errors/BadRequestError.js";
import NotFoundError from "../errors/NotFoundError.js";
import { isValidObjectId } from "mongoose";

export default class CityServices {
  // C
  static async createCity(obj: ICityDTO): Promise<ICity | null> {
    const query = await CityDAO.getOneByQuery(obj);
    if (query)
      throw new BadRequestError(
        "City Name is added Before , name must be uniuqe"
      );
    const newCity = await CityDAO.create(obj);
    return newCity;
  }

  // R
  static async getCities(page = 1, limit = 50): Promise<ICity[]> {
    const result = await CityDAO.getList(page, limit);
    if (!result || !result.length) throw new NotFoundError("No Cities here");
    return result;
  }

  // U
  static async updateCity(obj: ICityUpdateDTO): Promise<ICity> {
    const { _id } = obj;
    if (!isValidObjectId(_id)) throw new BadRequestError("Invalid ID Format");
    const updated = await CityDAO.updateById(_id, obj);
    if (!updated) throw new NotFoundError("City Not Found");
    return updated;
  }

  // D
  static async deleteCity(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestError("Invalid ID Format");
    const result = await CityDAO.deleteById(id);
    if (!result) throw new NotFoundError("City Not Found");
  }
}
