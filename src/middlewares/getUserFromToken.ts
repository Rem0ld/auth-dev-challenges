import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Tcredentials } from "../global";

export default async function getUserFromToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization?.length) {
    return res.status(400).json("missing JWT");
  }

  let accessToken = req.headers.authorization.split(" ");
  if (accessToken[0] !== "Bearer" || !accessToken[1]?.length) {
    return res.status(400).json("Missing or malformed JWT");
  }

  const decoded = jwt.decode(accessToken[1]) as Omit<Tcredentials, "password">;

  req.params.userId = decoded.id;
  req.params.email = decoded.email;
  return next();
}
