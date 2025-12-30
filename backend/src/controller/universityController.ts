import type { Request, Response } from "express";
import UniversityServices from "../services/UniversityServices.js";
import validate from "../utils/validateSchema.js";
import z from "zod";

export default class UniversityController {
  static async getUniversities(req: Request, res: Response) {
    const { page, limit } = req.query;
    const p = validate(
      z.coerce
        .number("page must be number")
        .min(1, "page must be >= 1")
        .default(1),
      page
    );
    const l = validate(
      z.coerce
        .number("limit must be number")
        .min(1, "page must be >= 1")
        .default(50),
      limit
    );
    const data = await UniversityServices.getAllUniversities(p, l);
    return res.status(200).json({ status: "success", data });
  }
}
