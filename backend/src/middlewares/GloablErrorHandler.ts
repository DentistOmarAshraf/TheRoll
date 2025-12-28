import type { Request, Response, NextFunction } from "express";
import AppErrors from "../errors/AppErrors.js";

export default function gloablErrorHandler(
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  // Handle invalid JSON body
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  // Handle mongoose validation/cast errors
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).json({ error: err.message });
  }

  // Handle Errors related to CRUD of DAOS
  if (err instanceof AppErrors) {
    return res.status(err.status).json({ status: "error", error: err.message });
  }
  // Handle duplicate key error
  if (err.code === 11000) {
    return res.status(409).json({ error: "Duplicate key", key: err.keyValue });
  }

  // Handle Mongo network errors
  if (err.name === "MongoNetworkError") {
    return res.status(503).json({ error: "Database unavailable" });
  }

  // Log stack for debugging
  console.error(err.stack);

  // Fallback
  res.status(500).json({ error: "Internal Server Error" });
}
