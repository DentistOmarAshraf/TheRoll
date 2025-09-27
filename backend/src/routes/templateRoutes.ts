import type { Express } from "express";
import TemplateController from "../controller/templateController.js";
import requestBody from "../middlewares/RequestBody.js";

export default function templateRoutes(app: Express) {
    app.get("/template/:id", TemplateController.getTemplateById);
    app.post("/template", requestBody, TemplateController.createTemplate);
    app.delete("/template", requestBody, TemplateController.deleteTemplateById)
    app.put("/template", requestBody, TemplateController.updateTemplateById)
}