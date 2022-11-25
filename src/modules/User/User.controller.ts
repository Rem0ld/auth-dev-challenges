import {
  ClassErrorMiddleware,
  Controller,
  Delete,
  Get,
  Put,
  ClassMiddleware,
} from "@overnightjs/core";
import { user } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import protectRoute from "../../middlewares/protectRoutes";
import errorHandler from "../../services/errorHandler";
import BaseController from "../../utils/baseController";
import UserService from "./User.service";

@Controller("api/user")
@ClassErrorMiddleware(errorHandler)
@ClassMiddleware(protectRoute)
export default class UserController extends BaseController<user> {
  constructor(service: UserService) {
    super(service);
  }

  @Get()
  async get(req: Request, res: Response, next: NextFunction) {
    return super.get(req, res, next);
  }

  @Get(":id")
  async getById(req: Request, res: Response, next: NextFunction) {
    return super.getById(req, res, next);
  }

  @Put(":id")
  async update(req: Request, res: Response, next: NextFunction) {
    return super.update(req, res, next);
  }

  @Delete(":id")
  async delete(req: Request, res: Response, next: NextFunction) {
    return super.delete(req, res, next);
  }
}
