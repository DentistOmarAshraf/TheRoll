import UserController from "../controller/userController.js";
import requestBody from "../middlewares/RequestBody.js";
import type { Express } from "express";

export default function userRoutes(app: Express) {
  app.post("/newUser", requestBody, UserController.createUser);
  app.put("/user/:id", requestBody, UserController.updateUser);
  app.get("/confirm/:token", UserController.confirmUser);
}
