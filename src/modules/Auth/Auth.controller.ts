import {
  Controller,
  ClassMiddleware,
  ClassErrorMiddleware,
  Get,
  Post,
} from "@overnightjs/core";
import { NextFunction, Request, Response } from "express";
import errorHandler from "../../services/errorHandler";
import AuthService from "./Auth.service";

@Controller("api/auth")
@ClassErrorMiddleware(errorHandler)
export default class AuthController {
  constructor(private service: AuthService) {}

  @Get("check-token")
  private async checkToken(req: Request, res: Response, next: NextFunction) {
    return res.json("check token");
  }

  @Post()
  private async GenerateToken(req: Request, res: Response, next: NextFunction) {
    const [result, error] = await this.service.signIn(
      req.body,
      req.headers["user-agent"] as string
    );
    if (error) {
      return next(error);
    }

    return res.json("generate toekn");
  }
}
