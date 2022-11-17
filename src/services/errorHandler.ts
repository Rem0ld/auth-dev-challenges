import { Request, Response, NextFunction } from "express";

export default (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status = 500;
  let message = error.message;

  console.log(error);

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
