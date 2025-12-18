import {
  isValidObjectId,
  type ClientSession,
  type FilterQuery,
  type Model,
  type UpdateQuery,
  type Query,
  type PopulateOptions,
  type HydratedDocument,
  Types,
} from "mongoose";

export default class BaseDAO<
  T,
  DTO,
  UpdateDTO,
  relations extends PopulateOptions | string = string
> {
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
  async create(object: DTO, session?: ClientSession): Promise<T | null> {
    const sanitizied = this.sanitizeDTO(object);
    const result = await this.model.create([sanitizied], {
      session: session || null,
    });
    const toRet = result[0];
    if (!toRet) return null;
    return (toRet as HydratedDocument<T>).toObject();
  }

  // Read
  async getById(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) return null;
    const result = await this.model.findById(id).lean().exec();
    return result as T;
  }

  async getByIdWithOption(
    id: string,
    populate?: relations | relations[]
  ): Promise<T | null> {
    if (!isValidObjectId(id)) return null;

    let query: Query<T | null, T> = this.model.findById(id);
    if (populate) query.populate(populate as any);

    const result = await query.lean().exec();
    return result as unknown as T | null;
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

  async getOneByQuery(obj: FilterQuery<T>): Promise<T | null> {
    const data = await this.model.findOne(obj).lean().exec();
    return data ? (data as T) : null;
  }

  async getListByQuery(
    obj: FilterQuery<T>,
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
  async updateById(
    id: string,
    obj: UpdateDTO,
    session?: ClientSession
  ): Promise<T | null> {
    if (!isValidObjectId(id)) return null;
    const data = this.sanitizeDTO(obj);
    const result = await this.model.findByIdAndUpdate(id, data as Partial<T>, {
      new: true,
      runValidators: true,
      session: session || null,
    });
    return result as T;
  }

  async atomicUpdate(
    id: string | Types.ObjectId,
    obj: UpdateQuery<T>,
    session?: ClientSession
  ): Promise<T | null> {
    if (!isValidObjectId(id)) return null;
    const result = await this.model
      .findByIdAndUpdate(id, obj, {
        new: true,
        runValidators: true,
        session: session || null,
      })
      .exec();
    return result ? result.toObject() : null;
  }

  async replace(
    id: string,
    newObject: any,
    session: ClientSession
  ): Promise<any> {
    if (!isValidObjectId(id)) return null;
    const result = await this.model
      .replaceOne({ _id: id }, newObject, {
        session,
        overwriteDiscriminatorKey: true,
        runValidators: true,
      })
      .exec();
    return result;
  }

  // Delete
  async deleteById(id: string, session?: ClientSession): Promise<boolean> {
    if (!isValidObjectId(id)) return false;
    const result = await this.model.findByIdAndDelete(id, {
      session: session || null,
    });
    return !!result;
  }
}
