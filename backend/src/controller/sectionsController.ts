import type { Response, Request } from "express";
import { isValidObjectId } from "mongoose";
import sectionDAO from "../DAO/daos/sectionsDAO.js";
import templateDAO from "../DAO/daos/templateDAO.js";

export default class SectionsController {
  static async getAllSections(req: Request, res: Response) {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 20;
    if (page <= 0) {
      return res.status(400).json({ error: "Page must be > 0" });
    }
    if (limit <= 0) {
      return res.status(400).json({ error: "limit must be > 0" });
    }
    try {
      const listOfSections = await sectionDAO.getAllSections(page, limit);
      return res.status(200).json(listOfSections);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      return res.status(500).json({ error: message });
    }
  }

  static async createSection(req: Request, res: Response) {
    if (!req.body || !req.body.name) {
      return res.status(400).json({ error: "name of section is missing" });
    }
    const { name } = req.body;
    try {
      const newSection = await sectionDAO.createNewSection({ name });
      return res.status(201).json({ created: newSection });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      return res.status(500).json({ error: message });
    }
  }

  static async deleteSection(req: Request, res: Response) {
    if (!req.body || !req.body.id) {
      return res.status(400).json({ error: "id of sections is missing" });
    }
    const { id } = req.body;
    try {
      const deleted = await sectionDAO.deleteSectionById(id);
      if (!deleted) {
        return res.status(404).json({ error: "not found" });
      }
      return res.status(201).json({ deleted });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      return res.status(500).json({ error: message });
    }
  }

  static async updateSection(req: Request, res: Response) {
    if (!req.body) {
      return res.status(400).json({ error: "body is missing" });
    }
    if (!req.body.id) {
      return res.status(400).json({ error: "id is missing" });
    }
    if (!req.body.name) {
      return res.status(400).json({ error: "name is missing" });
    }
    const { id, name } = req.body;
    try {
      const updated = await sectionDAO.updateSectionById(id, { name });
      return res.status(200).json({ updated });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      return res.status(500).json({ error: message });
    }
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
    try {
      const listOfTemplates = await templateDAO.getTemplatesBySectionID(
        id,
        page,
        limit
      );
      return res.status(200).json(listOfTemplates);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      return res.status(500).json({ error: message });
    }
  }
}
