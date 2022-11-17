import { Delete, Get, Post, Put } from "@overnightjs/core";
import { NextFunction, Request, Response } from "express";
import { baseLimit } from "../config/constants";
import { IService } from "../global";

export default class BaseController<T> {
  service;
  constructor(service: IService<T>) {
    this.service = service;
  }

  async get(req: Request, res: Response, next: NextFunction) {
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

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const [result, error] = await this.service.findById(id);
    if (error) {
      return next(error);
    }

    return res.json(result);
  }

  async post(req: Request, res: Response, next: NextFunction) {
    const [result, error] = await this.service.create(req.body);
    if (error) {
      return next(error);
    }

    return res.json(result);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const [result, error] = await this.service.update(id, req.body);
    if (error) {
      return next(error);
    }

    return res.json(result);
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const [result, error] = await this.service.delete(id);
    if (error) {
      return next(error);
    }

    return res.json(result);
  }
}
