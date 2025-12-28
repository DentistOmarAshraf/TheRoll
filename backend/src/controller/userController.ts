import type { Request, Response } from "express";
import UserServices from "../services/UserServices.js";
import validate from "../utils/validateSchema.js";
import { zUserRegSchema, zUserUpdateSchema } from "../schemas/user.schema.js";
import BadRequestError from "../errors/BadRequestError.js";

export default class UserController {
  /** Creating New User Controller */
  static async createUser(req: Request, res: Response) {
    const data = validate(zUserRegSchema, req.body);
    const newUser = await UserServices.createUser(data);
    return res.status(201).json({
      status: "success",
      data: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  }
  /**Confirming user token */
  static async confirmUser(req: Request, res: Response) {
    const { token } = req.params;
    if (!token) {
      throw new BadRequestError("token params missing");
    }
    const result = await UserServices.confirmUser({ token });
    return res.status(201).json({
      status: "success",
      data: {
        _id: result._id,
        fullName: result.fullName,
      },
    });
  }

  static async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) throw new BadRequestError("معرف غير صالح");
    const data = validate(zUserUpdateSchema, req.body);
    const updated = await UserServices.updateUser(id, data);
    return res.status(201).json(updated);
  }

  static async chk(req: Request, res: Response) {
    const chk = await UserServices.checkUserPass(req.body);
    return res.status(200).json({ passIsCorrect: chk });
  }
}
