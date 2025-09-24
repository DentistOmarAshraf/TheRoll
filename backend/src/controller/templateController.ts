import templateDAO from "../DAO/daos/templateDAO.js";
import { isValidObjectId, Types } from "mongoose";
import type { Request, Response } from "express";
import type { ITemplateDAO } from "../DAO/interfaces/ITemplateDAO.js";

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
      tags = [],
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
    if (!Array.isArray(tags)) {
      return res.status(400).json({ error: "Tags must be array of string" });
    }
    try {
      const newTemplate = await templateDAO.createNewTemplate({
        section: new Types.ObjectId(section),
        title,
        intro,
        middle,
        final,
        fields: fields.map((f) => new Types.ObjectId(f)),
        tags,
      });
      return res.status(201).json(newTemplate);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      return res.status(500).json({ error: message });
    }
  }

  static async updateTemplateById(req: Request, res: Response) {
    const { id } = req.params;
    if (!id || !isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    if (!req.body) {
      return res.status(400).json({ error: "No Body" });
    }

    const { section, title, intro, middle, final, fields, summary, tags } =
      req.body;
    if (section && !isValidObjectId(section)) {
      return res.status(400).json({ error: "Invalid sectionID" });
    }
    if (title && typeof title !== "string") {
      return res.status(400).json({ error: "title must be string" });
    }
    if (intro && typeof intro !== "string") {
      return res.status(400).json({ error: "intro must be string" });
    }
    if (middle && typeof middle !== "string") {
      return res.status(400).json({ error: "middle must be string" });
    }
    if (summary && typeof summary !== "string") {
      return res.status(400).json({ error: "summury must be string " });
    }
    if (fields && !Array.isArray(fields)) {
      return res.status(400).json({ error: "fields must be array of IDs" });
    }
    if (tags && !Array.isArray(tags)) {
      return res.status(400).json({ error: "tags must be array of strings" });
    }

    const newData: Partial<ITemplateDAO> = {};
    if(section) newData.section = section;
    if (title) newData.title = title
    if (intro) newData.intro = intro;
    if (middle) newData.middle = middle;
    if (final) newData.final = final;
    if (summary) newData.summary = summary;
    if (fields) newData.fields = fields;
    if (tags) newData.tags = tags;

    try {
      const updated = await templateDAO.updateTemplateById(id, newData);
      if (!updated) {
        return res.status(404).json({ error: "not found" });
      }
      return res.status(200).json({ updated });
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
