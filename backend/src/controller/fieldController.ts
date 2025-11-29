import fieldDAO from "../DAO/fieldsDAO.js";
import type { Request, Response } from "express";

export default class FieldController {
  static async getAllFields(req: Request, res: Response) {
    let page = req.query.page ? Number(req.query.page as string) : 1;
    const limit = req.query.limit ? Number(req.query.limit as string) : 20;
    if (page <= 0) {
      return res.status(400).json({ error: "Page must be > 0" });
    }
    if (limit <= 0) {
      return res.status(400).json({ error: "limit must be > 0" });
    }
    const documentCount = await fieldDAO.countDocument();
    const pages = Math.ceil(documentCount / limit) || 1;
    if (page > pages) page = pages;
    const listOfFields = await fieldDAO.getAllFields(page, limit);
    const dataTobeReturned = {
      page,
      pages,
      listOfFields,
    };
    return res.status(200).json(dataTobeReturned);
  }
}
