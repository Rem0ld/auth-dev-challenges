import {
  Controller,
  ClassErrorMiddleware,
  Post,
  Middleware,
  Delete,
} from "@overnightjs/core";
import { NextFunction, Request, Response } from "express";
import getUserFromToken from "../../middlewares/getUserFromToken";
import errorHandler from "../../services/errorHandler";
import AuthService from "./Auth.service";

@Controller("api/auth")
@ClassErrorMiddleware(errorHandler)
export default class AuthController {
  constructor(private service: AuthService) {}

  @Delete()
  @Middleware(getUserFromToken)
  async logout(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    const [_, error] = await this.service.logOut(
      userId,
      req.headers["user-agent"] as string
    );
    if (error) {
      return next(error);
    }

    return res.status(200).end();
  }

  @Post("login")
  async login(req: Request, res: Response, next: NextFunction) {
    const [result, error] = await this.service.signIn(
      req.body,
      req.headers["user-agent"] as string
    );
    if (error) {
      return next(error);
    }

    return res.status(200).json({
      accessToken: result?.accessToken,
    });
  }

  @Post("register")
  async register(req: Request, res: Response, next: NextFunction) {
    const [_, error] = await this.service.register(req.body);
    if (error) {
      return next(error);
    }

    return res.status(200).end();
  }
}
