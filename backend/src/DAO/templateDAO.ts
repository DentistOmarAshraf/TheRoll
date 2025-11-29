import { Templates } from "../models/tmeplates.js";
import { Sections } from "../models/sections.js";
import type { ITemplateDTO } from "../interfaces/templates/ITemplate.js";
import type { ITemplate } from "../interfaces/templates/ITemplate.js";
import type { Types } from "mongoose";
import { Fields } from "../models/fields.js";
import NotFoundError from "../errors/NotFoundError.js";
import BadRequestError from "../errors/BadRequestError.js";

class TemplateDAO {
  async createNewTemplate(template: ITemplateDTO): Promise<ITemplate | null> {
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

    const newTemplate = await Templates.create(template);
    return newTemplate;
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
    const template = await Templates.findById(id).populate("fields");
    if (!template) throw new NotFoundError("Template Not Found");
    return template;
  }

  async updateTemplateById(
    id: string | Types.ObjectId,
    newData: Partial<ITemplateDTO>
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
    const updated = await Templates.findByIdAndUpdate(id, newData, {
      new: true,
      runValidators: true,
    });
    if (!updated) throw new NotFoundError("Template Not Found");
    return updated;
  }

  async deleteTemplateById(
    id: string | Types.ObjectId
  ): Promise<ITemplate | null> {
    const deleted = await Templates.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundError("Template Not Found");
    return deleted;
  }
}

const templateDAO = new TemplateDAO();
export default templateDAO;
