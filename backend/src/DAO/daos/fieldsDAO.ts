import { Fields } from "../../models/schemas/fields.js";
import type { IFieldDAO } from "../interfaces/IFieldDAO.js";
import type { IField } from "../../models/interfaces/IField.js";
import type { Types } from "mongoose";

class FieldDAO {
  async getFieldById(id: string | Types.ObjectId): Promise<IField | null> {
    try {
      const result = await Fields.findById(id);
      return result;
    } catch (e) {
      throw new Error(`FieldDAO.getFiledById: ${e}`);
    }
  }

  async getAllFields(page: number, limit: number): Promise<IField[] | null> {
    const start = (page - 1) * limit;
    try {
      const result = await Fields.find().skip(start).limit(limit);
      return result;
    } catch (e) {
      throw new Error(`FieldDAO.getAllFields: ${e}`);
    }
  }

  async createNewField(field: IFieldDAO): Promise<IField | null> {
    try {
      const result = await Fields.create(field);
      return result;
    } catch (e) {
      throw new Error(`FieldDAO.createNewField: ${e}`);
    }
  }

  async deleteFieldByID(id: string | Types.ObjectId): Promise<IField | null> {
    try {
      const deleted = await Fields.findByIdAndDelete(id);
      return deleted;
    } catch (e) {
      throw new Error(`FieldDAO.deleteFieldByID: ${e}`);
    }
  }
}

const fieldDAO = new FieldDAO();
export default fieldDAO;
