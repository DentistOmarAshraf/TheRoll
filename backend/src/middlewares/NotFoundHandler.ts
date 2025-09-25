import type { Request, Response, NextFunction } from "express";

export default async function notFoundHandler(
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  return res.status(404).json({ error: "API ROUTE NOT FOUND!" });
}
