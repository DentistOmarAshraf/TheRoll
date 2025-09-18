import fieldDAO from "../DAO/daos/fieldsDAO.js";
import type { Request, Response } from "express";

export default class FieldController {
  static async getAllFields(req: Request, res: Response) {
    const page = req.query.page ? Number(req.query.page as string) : 1;
    const limit = req.query.limit ? Number(req.query.limit as string) : 20;
    if (page <= 0) {
      return res.status(400).json({ error: "Page must be > 0" });
    }
    if (limit <= 0) {
      return res.status(400).json({ error: "limit must be > 0" });
    }
    try {
      const result = await fieldDAO.getAllFields(page, limit);
      return res.status(200).json(result);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      return res.status(500).json({ error: message });
    }
  }
}
