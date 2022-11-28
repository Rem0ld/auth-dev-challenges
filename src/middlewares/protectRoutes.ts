import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Tcredentials } from "../global";
import { service as refreshTokenService } from "../modules/RefreshToken/index";
import { service as authService } from "../modules/Auth/index";

export default async function protectRoute(
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

  try {
    const secret = process.env.JWT_SECRET as string;
    jwt.verify(accessToken[1], secret);
  } catch (e: unknown) {
    const error = e as Error;

    if (error.message.includes("jwt expired")) {
      console.log("==============");
      console.log("JWT expired, trying to make a new one from refresh token");
      const [result, error] = await refreshTokenService.findOne(
        decoded?.id,
        req.headers["user-agent"] || ""
      );
      if (error || !result) {
        return res.status(401).json("JWT expired");
      }
      console.log("Refresh token found, making new Access Token");

      const newAccessToken = authService.createAccessToken({
        email: decoded.email,
        id: decoded.id,
      });

      console.log("New access token", newAccessToken);

      req.headers.authorization = `Bearer ${newAccessToken}`;
      res.cookie("access_token", newAccessToken, {
        maxAge: 1000 * 60 * 5,
        httpOnly: true,
      });
    }

    if (error?.message.includes("invalid signature")) {
      return res.status(400).json("Invalid signature JWT");
    }
  }

  req.params.userId = decoded.id;
  req.params.email = decoded.email;

  return next();
}
