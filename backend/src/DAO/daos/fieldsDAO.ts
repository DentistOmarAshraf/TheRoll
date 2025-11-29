import { Fields } from "../../models/fields.js";
import type { IFieldDTO } from "../../interfaces/fields/IField.js";
import type { IField } from "../../interfaces/fields/IField.js";
import type { Types } from "mongoose";
import NotFoundError from "../../errors/NotFoundError.js";

class FieldDAO {
  async countDocument(): Promise<number> {
    const count = await Fields.countDocuments();
    return count;
  }

  async getFieldById(id: string | Types.ObjectId): Promise<IField | null> {
    const result = await Fields.findById(id);
    if (!result) {
      throw new NotFoundError("Field Not Found");
    }
    return result;
  }

  async getAllFields(page: number, limit: number): Promise<IField[] | null> {
    const start = (page - 1) * limit;
    const result = await Fields.find().skip(start).limit(limit);
    return result;
  }

  async createNewField(field: IFieldDTO): Promise<IField | null> {
    const result = await Fields.create(field);
    return result;
  }

  async deleteFieldByID(id: string | Types.ObjectId): Promise<IField | null> {
    const deleted = await Fields.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundError("Field Not Found");
    }
    return deleted;
  }
}

const fieldDAO = new FieldDAO();
export default fieldDAO;
