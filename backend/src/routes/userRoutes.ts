import UserController from "../controller/userController.js";
import authHandler from "../middlewares/AuthHandler.js";
import requestBody from "../middlewares/RequestBody.js";
import type { Express } from "express";

export default function userRoutes(app: Express) {
  app.post("/newUser", requestBody, UserController.createUser);
  app.put("/user/:id", requestBody, UserController.updateUser);
  app.get("/confirm/:token", UserController.confirmUser);
  app.post("/login", requestBody, UserController.loginUser);
  app.get("/user/refresh", UserController.refreshAccessToken);
  app.get("/user/me", authHandler, UserController.UserDetails)
}
