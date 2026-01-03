import type { Request, Response } from "express";
import UserServices from "../services/UserServices.js";
import validate from "../utils/validateSchema.js";
import {
  zUserRegSchema,
  zUserUpdateSchema,
  zLoginSchema,
} from "../schemas/user.schema.js";
import BadRequestError from "../errors/BadRequestError.js";
import Unauthorized from "../errors/Unauthorized.js";

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

  static async loginUser(req: Request, res: Response) {
    const userData = validate(zLoginSchema, req.body);
    const { refToken, accToken, user } = await UserServices.loginUser(
      userData,
      req.cookies.refToken // if there is a token saved in redis it should be cleared
    );
    const cookieOption: any = {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      path: "/user",
    };
    if (userData.remember) {
      cookieOption.maxAge = 1000 * 60 * 60 * 24 * 15;
    }
    res.cookie("refToken", refToken, cookieOption);
    res.status(200).json({
      status: "success",
      data: {
        accToken,
        user: { _id: user._id, email: user.email, fullName: user.fullName },
      },
    });
  }

  static async refreshAccessToken(req: Request, res: Response) {
    const { refToken } = req.cookies;
    if (!refToken) throw new Unauthorized("يجب تسجيل الدخول");
    try {
      const accToken = await UserServices.reproduceJWT({ refToken });
      return res.status(200).json({ status: "success", data: accToken });
    } catch (err) {
      res.clearCookie("refToken", {
        path: "/user",
        httpOnly: true,
        secure: true,
      });
      throw err;
    }
  }

  static async UserDetails(req: Request, res: Response) {
    const { user } = req as any;
    const data = await UserServices.userDetails(user.payload._id);
    return res.status(200).json({ status: "success", data });
  }

  static async logoutUser(req: Request, res: Response) {
    const { refToken } = req.cookies;
    if (!refToken) throw new BadRequestError("No Cookie");
    await UserServices.logoutUser({ refToken });
    res.clearCookie("refToken", {
      path: "/user",
      httpOnly: true,
      secure: true,
    });
    return res.status(200).json({ status: "success", message: "logged out" });
  }

  static async logoutUserAllDevices(req: Request, res: Response) {
    const { refToken } = req.cookies;
    if (!refToken) throw new BadRequestError("Cookies is missing");
    const userId = refToken.split(":")[0];
    const deleted = await UserServices.logoutUserAllDevices(userId);
    res.clearCookie("refToken", {
      path: "/user",
      httpOnly: true,
      secure: true,
    });
    return res.status(200).json({ status: "success", loggedout: deleted });
  }

  static async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) throw new BadRequestError("معرف غير صالح");
    const data = validate(zUserUpdateSchema, req.body);
    const updated = await UserServices.updateUser(id, data);
    return res.status(201).json(updated);
  }
}
