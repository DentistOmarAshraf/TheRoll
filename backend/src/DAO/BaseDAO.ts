import type { Model, UpdateQuery } from "mongoose";
import type { ICity, ICityDTO } from "../interfaces/city/ICity.js";
import { CityModel } from "../models/city.js";

export default class BaseDAO<T, DTO, UpdateDTO> {
  protected model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }

  protected sanitizeDTO(obj: DTO | UpdateDTO): DTO | UpdateDTO {
    const theObject = { ...obj } as any;
    if ("_id" in theObject) delete theObject._id;
    return theObject as DTO | UpdateDTO;
  }

  protected calculateSkip(page: number, limit: number): number {
    return (page - 1) * limit;
  }

  // Create
  async create(object: DTO): Promise<T> {
    const result = await this.model.create(object);
    return result.toObject();
  }

  // Read
  async getById(id: string): Promise<T | null> {
    const result = await this.model.findById(id).lean().exec();
    return result as T;
  }

  async getList(page: number, limit: number): Promise<T[]> {
    const skip = this.calculateSkip(page, limit);
    const result = await this.model
      .find()
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
    return result as T[];
  }

  async getOneByQuery(obj: Partial<T>): Promise<T | null> {
    const data = await this.model.findOne(obj).lean().exec();
    return data ? (data as T) : null;
  }

  async getListByQuery(
    obj: Partial<T>,
    page: number,
    limit: number
  ): Promise<T[]> {
    const skip = this.calculateSkip(page, limit);
    const data = await this.model
      .find(obj)
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
    return data as T[];
  }

  // Update
  async updateById(id: string, obj: UpdateDTO): Promise<T | null> {
    const data = this.sanitizeDTO(obj);
    const result = await this.model.findByIdAndUpdate(id, data as Partial<T>, {
      new: true,
      runValidators: true,
    });
    return result as T;
  }

  async atomicUpdate(id: string, obj: UpdateQuery<T>): Promise<T | null> {
    const result = await this.model.findByIdAndUpdate(id, obj).exec();
    return result ? result.toObject() : null;
  }

  // Delete
  async deleteById(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id);
    return !!result;
  }
}

export const CityDAO = new BaseDAO<ICity, ICityDTO, ICityDTO>(CityModel);
