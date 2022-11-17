import { Controller, Delete, Get, Post } from "@overnightjs/core";
import { NextFunction, Request, Response } from "express";
import SampleService from "./Sample.service";

@Controller("sample")
export default class SampleController {
  constructor(private service: SampleService) {}

  @Get()
  private async get(req: Request, res: Response, next: NextFunction) {}

  @Post()
  private async post(req: Request, res: Response) {}

  @Delete()
  private async delete(req: Request, res: Response) {}
}
