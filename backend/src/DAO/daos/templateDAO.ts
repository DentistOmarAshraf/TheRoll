import { Templates } from "../../models/schemas/tmeplates.js";
import { Sections } from "../../models/schemas/sections.js";
import type { ITemplateDAO } from "../interfaces/ITemplateDAO.js";
import type { ITemplate } from "../../models/interfaces/ITemplate.js";
import type { Types } from "mongoose";
import { Fields } from "../../models/schemas/fields.js";
import NotFoundError from "../../errors/NotFoundError.js";
import BadRequestError from "../../errors/BadRequestError.js";

class TemplateDAO {
  async createNewTemplate(template: ITemplateDAO): Promise<ITemplate | null> {
    const sectionIsExist = await Sections.exists({ _id: template.section });
    if (!sectionIsExist) {
      throw new NotFoundError("Section is Not Exist");
    }
    if (!template.fields?.length) {
      throw new BadRequestError("Fields must be added");
    }

    const count = await Fields.countDocuments({
      _id: { $in: template.fields },
    });
    if (count !== template.fields.length) {
      throw new BadRequestError("One or more field IDs are invalid");
    }

    try {
      const newTemplate = await Templates.create(template);
      return newTemplate;
    } catch (err) {
      throw err;
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
    } catch (err) {
      throw err;
    }
  }
  async getAllTemplate(page: number, limit: number): Promise<ITemplate[]> {
    const start = (page - 1) * limit;
    try {
      const listOfTemplates = await Templates.find().skip(start).limit(limit);
      return listOfTemplates;
    } catch (err) {
      throw err;
    }
  }

  async getTemplateById(
    id: string | Types.ObjectId
  ): Promise<ITemplate | null> {
    try {
      const template = await Templates.findById(id).populate("fields");
      return template;
    } catch (err) {
      throw err;
    }
  }

  async updateTemplateById(
    id: string | Types.ObjectId,
    newData: Partial<ITemplateDAO>
  ): Promise<ITemplate | null> {
    if (newData.section) {
      const sectionIsExist = await Sections.exists({ _id: newData.section });
      if (!sectionIsExist) {
        throw new NotFoundError("Section is Not Exist");
      }
    }
    if (newData.fields) {
      const count = await Fields.countDocuments({
        _id: { $in: newData.fields },
      });
      if (count !== newData.fields.length) {
        throw new BadRequestError("One or more field IDs are invalid");
      }
    }

    try {
      const updated = await Templates.findByIdAndUpdate(id, newData, {
        new: true,
        runValidators: true,
      });
      return updated;
    } catch (err) {
      throw err;
    }
  }

  async deleteTemplateById(
    id: string | Types.ObjectId
  ): Promise<ITemplate | null> {
    try {
      const deleted = await Templates.findByIdAndDelete(id);
      return deleted;
    } catch (err) {
      throw err;
    }
  }
}

const templateDAO = new TemplateDAO();
export default templateDAO;
