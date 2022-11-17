import {
  ClassErrorMiddleware,
  Controller,
  Delete,
  Get,
  Post,
} from "@overnightjs/core";
import { NextFunction, Request, Response } from "express";
import { baseLimit } from "../../config/constants";
import errorHandler from "../../services/errorHandler";
import UserService from "./User.service";

@Controller("api/user")
@ClassErrorMiddleware(errorHandler)
export default class UserController {
  constructor(private service: UserService) {}

  @Get()
  private async get(req: Request, res: Response, next: NextFunction) {
    const { limit = baseLimit, skip = 0, ...rest } = req.query;

    const [result, error] = await this.service.findAll(
      limit as string,
      skip as string,
      rest
    );
    if (error) {
      return next(error);
    }

    return res.json(result);
  }

  @Post()
  private async post(req: Request, res: Response) {
    const [result, error] = await this.service.create(req.body);
  }

  @Delete()
  private async delete(req: Request, res: Response) {}
}
