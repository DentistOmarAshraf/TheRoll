import type { Express } from "express";
import SectionsController from "../controller/sectionsController.js";
import requestBody from "../middlewares/RequestBody.js";

export default function sectionsRoutes(app: Express) {
  app.get("/sections", SectionsController.getAllSections);
  app.post("/sections", requestBody, SectionsController.createSection);
  app.delete("/sections", requestBody, SectionsController.deleteSection);
  app.put("/sections", requestBody, SectionsController.updateSection);
  app.get("/sections/:id/templates", SectionsController.getTemplatesOfSection);
}
