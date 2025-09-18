import templateDAO from "../DAO/daos/templateDAO.js";
import { isValidObjectId, Types } from "mongoose";
import type { Request, Response } from "express";

export default class TemplateController {
  static async getTemplateById(req: Request, res: Response) {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    try {
      const template = await templateDAO.getTemplateById(id as string);
      if (!template) {
        return res.status(404).json({ error: "Not Found" });
      }
      return res.status(200).json(template);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      return res.status(500).json({ error: message });
    }
  }

  static async createTemplate(req: Request, res: Response) {
    if (!req.body) {
      return res.status(400).json({ error: "Invalid body" });
    }

    const {
      section,
      title,
      intro = "",
      middle = "",
      final = "",
      fields,
    } = req.body;

    if (!section || !isValidObjectId(section)) {
      return res.status(400).json({ error: "Invalid SectionId" });
    }
    if (!title) {
      return res.status(400).json({ error: "title missing" });
    }
    if (!fields || !Array.isArray(fields) || !fields.length) {
      return res.status(400).json({ error: "Field Array Invalid" });
    }
    try {
      const newTemplate = await templateDAO.createNewTemplate({
        section: new Types.ObjectId(section),
        title,
        intro,
        middle,
        final,
        fields: fields.map((f) => new Types.ObjectId(f)),
      });
      return res.status(201).json(newTemplate);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      return res.status(500).json({ error: message });
    }
  }

  static async deleteTemplateById(req: Request, res: Response) {
    const { id } = req.params;
    if (!id || !isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid template Id" });
    }
    try {
      const deleted = await templateDAO.deleteTemplateById(id);
      if (!deleted) {
        return res.status(404).json({ error: "Not Found" });
      }
      return res.status(200).json({ deleted });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      return res.status(500).json({ error: message });
    }
  }
}
