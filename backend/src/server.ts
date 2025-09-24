import connectToDB from "./db.js";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import filedRoutes from "./routes/fieldRoutes.js";
import sectionsRoutes from "./routes/sectionsRoutes.js";
import templateRoutes from "./routes/templateRoutes.js";
import AppErrors from "./errors/AppErrors.js";


// Setup Express server
const app = express()
app.use(express.json())
app.use(cors())

// Registration of Endpoint
filedRoutes(app);
sectionsRoutes(app);
templateRoutes(app);

// Not Found method
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

// Server Error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
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
    return res.status(err.status).json({ error: err.message });
  }
  // Handle duplicate key error
  if (err.code === 11000) {
    return res.status(409).json({ error: "Duplicate key" });
  }

  // Handle Mongo network errors
  if (err.name === "MongoNetworkError") {
    return res.status(503).json({ error: "Database unavailable" });
  }

  // Log stack for debugging
  console.error(err.stack);

  // Fallback
  res.status(500).json({ error: "Internal Server Error" });
});


(async () => {
  await connectToDB();
  app.listen(5000,"0.0.0.0", () => {
    console.log("server Started");
  })
})()