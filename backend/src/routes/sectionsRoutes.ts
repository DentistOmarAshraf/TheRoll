import type {Express} from "express"
import SectionsController from "../controller/sectionsController.js"

export default function sectionsRoutes(app: Express) {
    app.get("/sections", SectionsController.getAllSections);
    app.post("/sections", SectionsController.createSection);
    app.delete("/sections", SectionsController.deleteSection);
    app.put("/sections", SectionsController.updateSection);
    app.get("/sections/:id/templates", SectionsController.getTemplatesOfSection)
}