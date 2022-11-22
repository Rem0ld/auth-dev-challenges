import { Result, Tcredentials } from "../../global";
import bcryptjs from "bcryptjs";
import { ok, err } from "../../utils/promisifier";
import UserService from "../User/User.service";
import { user } from "@prisma/client";
import jwt from "jsonwebtoken";
import Joi from "joi";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import RefreshTokenService from "../RefreshToken/RefreshToken.service";

export default class AuthService {
  constructor(
    private userService: UserService,
    private refreshTokenService: RefreshTokenService
  ) {}

  createAccessToken(payload: Omit<Tcredentials, "password">): string {
    const secret = process.env.JWT_SECRET as string;

    return jwt.sign(payload, secret, {
      expiresIn: "15min",
    });
  }

  async signIn(
    { email, password }: { email: string; password: string },
    userAgent: string
  ): Promise<Result<{ accessToken: string }, Error>> {
    const emailIsValid = Joi.string().email().validate(email);
    if (!emailIsValid) {
      return err(
        new PrismaClientKnownRequestError("not valid", "P2023", "4.6.1")
      );
    }

    const [result, error] = await this.userService.findByEmail(email);
    if (error || !result) {
      return err(error);
    }

    const valid = await bcryptjs.compare(password, (result as user).password);
    if (!valid) {
      return err(new Error("Invalid credentials"));
    }

    const [_, errorRefreshToken] = await this.refreshTokenService.create(
      result.id,
      userAgent
    );
    if (errorRefreshToken) {
      console.log(errorRefreshToken);
    }

    const payload = {
      email: result.email,
      id: result.id,
    };
    return ok({ accessToken: this.createAccessToken(payload) });
  }

  async logOut(
    userId: string,
    deviceName: string
  ): Promise<Result<void, Error>> {
    const [_, error] = await this.refreshTokenService.delete(
      userId,
      deviceName
    );
    if (error) {
      return err(error);
    }

    return ok(null);
  }
}
