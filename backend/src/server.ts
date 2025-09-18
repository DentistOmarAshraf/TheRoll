import connectToDB from "./db.js";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import filedRoutes from "./routes/fieldRoutes.js";
import sectionsRoutes from "./routes/sectionsRoutes.js";


// Setup Express server
const app = express()
app.use(express.json())
app.use(cors())

// Registration of Endpoint
filedRoutes(app);
sectionsRoutes(app);

// Not Found method
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

// Server Error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

(async () => {
  await connectToDB();
  app.listen(5000,"0.0.0.0", () => {
    console.log("server Started");
  })
})()