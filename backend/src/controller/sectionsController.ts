import type { Response, Request } from "express";
import { isValidObjectId } from "mongoose";
import sectionDAO from "../DAO/daos/sectionsDAO.js";
import templateDAO from "../DAO/daos/templateDAO.js";

export default class SectionsController {
  static async getAllSections(req: Request, res: Response) {
    let page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 20;
    if (page <= 0) {
      return res.status(400).json({ error: "Page must be > 0" });
    }
    if (limit <= 0) {
      return res.status(400).json({ error: "limit must be > 0" });
    }
    const documentCount = await sectionDAO.countDocument();
    const pages = Math.ceil(documentCount / limit) || 1;
    if (page > pages) page = pages;
    const listOfSections = await sectionDAO.getAllSections(page, limit);
    const dataTobeReturned = {
      page,
      pages,
      listOfSections,
    };
    return res.status(200).json(dataTobeReturned);
  }

  static async createSection(req: Request, res: Response) {
    const { name } = req.body;
    if (!name)
      return res.status(400).json({ error: "Section Name is Missing" });
    const newSection = await sectionDAO.createNewSection({ name });
    return res.status(201).json({ created: newSection });
  }

  static async deleteSection(req: Request, res: Response) {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: "Section Id is missing" });
    }
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid Id, Id must by ObjectId" });
    }
    const deleted = await sectionDAO.deleteSectionById(id);
    if (!deleted) {
      return res.status(404).json({ error: "not found" });
    }
    return res.status(201).json({ deleted });
  }

  static async updateSection(req: Request, res: Response) {
    const { id, name } = req.body;
    if (!id) {
      return res.status(400).json({ error: "Section Id is missing" });
    }
    if (!name) {
      return res.status(400).json({ error: "Section Name is missing" });
    }
    const updated = await sectionDAO.updateSectionById(id, { name });
    return res.status(200).json({ updated });
  }

  static async getTemplatesOfSection(req: Request, res: Response) {
    const id = req.params.id as string;
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 20;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid section id" });
    }
    if (page < 0) {
      return res.status(400).json({ error: "Page must be > 0" });
    }
    if (limit < 0) {
      return res.status(400).json({ error: "limit must be > 0" });
    }
    const listOfTemplates = await templateDAO.getTemplatesBySectionID(
      id,
      page,
      limit
    );
    return res.status(200).json(listOfTemplates);
  }
}
