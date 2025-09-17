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
        .limit(limit)
        .populate("fields")
      return listOfTemplates;
    } catch (e) {
      throw new Error(`TemplateDAO.getTemplatesBySectionID ${e}`);
    }
  }
}

const templateDAO = new TemplateDAO();
export default templateDAO;
