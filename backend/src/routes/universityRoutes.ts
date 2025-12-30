import UniversityController from "../controller/universityController.js";
import type { Express } from "express";

export default function universityRoutes(app: Express) {
  app.get("/universities", UniversityController.getUniversities);
}
