import type { Request, Response, NextFunction } from "express";

export default function requestBody(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body) {
    return res.status(400).json({ error: "Request Body is missing" });
  }
  next();
}
