import type { Express } from "express";
import TemplateController from "../controller/templateController.js";

export default function templateRoutes(app: Express) {
    app.get("/template/:id", TemplateController.getTemplateById);
    app.post("/template", TemplateController.createTemplate);
    app.delete("/template/:id", TemplateController.deleteTemplateById)
    app.put("/template/:id", TemplateController.updateTemplateById)
}