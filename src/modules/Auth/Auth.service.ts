import { Result } from "../../global";
import bcryptjs from "bcryptjs";
import { ok, err } from "../../utils/promisifier";
import UserService from "../User/User.service";
import { user } from "@prisma/client";
import jwt from "jsonwebtoken";
import Joi from "joi";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export default class AuthService {
  constructor(private userService: UserService) {}

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
    if (error) {
      return err(error);
    }

    const valid = await bcryptjs.compare(password, (result as user).password);
    if (!valid) {
      return err(new Error("Invalid credentials"));
    }

    const payload = {
      email: result?.email,
      id: result?.id,
    };
    const secret = process.env.JWT_SECRET as string;
    // We can generate token
    const accessToken = jwt.sign(payload, secret, {
      expiresIn: "15min",
    });

    return ok({ accessToken });
  }
}
