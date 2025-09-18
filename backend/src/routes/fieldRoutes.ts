import FieldController from "../controller/fieldController.js";
import type { Express } from "express";

export default function filedRoutes(app: Express) {
    app.get("/fields", FieldController.getAllFields)
}