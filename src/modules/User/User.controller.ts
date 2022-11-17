import {
  ClassErrorMiddleware,
  Controller,
  Delete,
  Get,
  Post,
  Put,
} from "@overnightjs/core";
import { user } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import errorHandler from "../../services/errorHandler";
import BaseController from "../../utils/baseController";
import UserService from "./User.service";

@Controller("api/user")
@ClassErrorMiddleware(errorHandler)
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

  @Post()
  async create(req: Request, res: Response, next: NextFunction) {
    return super.post(req, res, next);
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
