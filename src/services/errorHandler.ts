import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from "@prisma/client/runtime";
import { Request, Response, NextFunction } from "express";

export default (
  error: PrismaClientKnownRequestError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status = 500;
  let message = error.message;

  console.log("==============");
  console.log(error);
  console.log(error.code);
  console.log("==============");

  if (error.code === "P2025") {
    status = 404;
    message = "Ressource not found";
  }

  if (error.code === "P2023") {
    status = 400;
    message = "Invalid uuid";
  }

  if (error.code === "P2002") {
    status = 409;
    message = "email already exists";
  }

  if (error.message.includes("exists")) {
    status = 409;
  }

  if (error.message.includes("missing")) {
    status = 400;
  }

  if (
    error.message.includes("Invalid or expired") ||
    error.message.includes("invalid token")
  ) {
    status = 401;
    message = "jwt invalid or expired";
  }

  res.status(status).json(message);
};
