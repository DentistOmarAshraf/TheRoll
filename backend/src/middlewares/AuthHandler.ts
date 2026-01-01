import type { Request, Response, NextFunction } from "express";
import Unauthorized from "../errors/Unauthorized.js";
import { varifyJwt } from "../utils/tokenizer.js";

export default async function authHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new Unauthorized("missing token");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = await varifyJwt(token);
    (req as any).user = payload;
  } catch (err) {
    throw new Unauthorized((err as Error).message);
  }
  next();
}
