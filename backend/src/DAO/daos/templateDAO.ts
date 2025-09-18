import { Templates } from "../../models/schemas/tmeplates.js";
import type { ITemplateDAO } from "../interfaces/ITemplateDAO.js";
import type { ITemplate } from "../../models/interfaces/ITemplate.js";
import type { Types } from "mongoose";

class TemplateDAO {
  async createNewTemplate(template: ITemplateDAO): Promise<ITemplate | null> {
    try {
      const newTemplate = await Templates.create(template);
      return newTemplate;
    } catch (e) {
      throw new Error(`TemplateDAO.createNewTemplate ${e}`);
    }
  }

  async getTemplatesBySectionID(
    id: string | Types.ObjectId,
    page: number,
    limit: number
  ): Promise<ITemplate[] | null> {
    const start = (page - 1) * limit;
    try {
      const listOfTemplates = await Templates.find({ section: id })
        .skip(start)
        .limit(limit);
      return listOfTemplates;
    } catch (e) {
      throw new Error(`TemplateDAO.getTemplatesBySectionID ${e}`);
    }
  }
  async getAllTemplate(page: number, limit: number): Promise<ITemplate[]> {
    const start = (page - 1) * limit;
    try {
      const listOfTemplates = await Templates.find().skip(start).limit(limit);
      return listOfTemplates;
    } catch (e) {
      throw new Error(`TemplateDAO.getAllTemplate ${e}`);
    }
  }

  async getTemplateById(
    id: string | Types.ObjectId
  ): Promise<ITemplate | null> {
    try {
      const template = await Templates.findById(id).populate("fields");
      return template;
    } catch (e) {
      throw new Error(`TemplateDAO.getTemplateById ${e}`);
    }
  }

  async updateTemplateById(
    id: string | Types.ObjectId,
    newData: Partial<ITemplateDAO>
  ): Promise<ITemplate | null> {
    try {
      const updated = await Templates.findByIdAndUpdate(id, newData, {
        new: true,
        runValidators: true,
      });
      return updated;
    } catch (e) {
      throw new Error(`TemplateDAO.updateTemplateById ${e}`);
    }
  }

  async deleteTemplateById(
    id: string | Types.ObjectId
  ): Promise<ITemplate | null> {
    try {
      const deleted = await Templates.findByIdAndDelete(id);
      return deleted;
    } catch (e) {
      throw new Error(`TemplateDAO.deleteTemplateById ${e}`);
    }
  }
}

const templateDAO = new TemplateDAO();
export default templateDAO;
