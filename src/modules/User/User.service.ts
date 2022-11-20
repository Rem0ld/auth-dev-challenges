import { user } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import bcryptjs from "bcryptjs";
import { IService, Result, Tcredentials, TProtectedUser } from "../../global";
import { err, ok } from "../../utils/promisifier";
import UserRepository from "./User.repository";
import { userSchema, uuidSchema } from "./User.validation";

export default class UserService implements IService<TProtectedUser> {
  constructor(private repo: UserRepository) {}

  async hashPassword(password: string) {
    const salt = await bcryptjs.genSalt(10);

    return bcryptjs.hash(password, salt);
  }

  exclude<user, Key extends keyof user>(
    user: user,
    keys: Key[]
  ): Omit<user, Key> {
    for (const key of keys) {
      delete user[key];
    }

    return user;
  }

  excludePass(user: user) {
    const keys = ["password"] as (keyof user)[];
    return this.exclude(user, keys);
  }

  async signIn(email: string) {
    return this.repo.delete;
  }

  async getCount() {
    return this.repo.getCount();
  }

  async findAll(limit: string, skip: string, rest?: Record<string, any>) {
    const [result, error] = await this.repo.findAll(+limit, +skip, rest);

    if (error || !result) {
      return err(error);
    }

    const protectedUsers = result.data.map(user => this.excludePass(user));

    return ok({
      data: protectedUsers,
      total: result.total,
    });
  }

  async findByEmail(email: string): Promise<Result<Tcredentials, Error>> {
    return this.repo.findByEmail(email);
  }

  async findById(id: string) {
    const valid = uuidSchema.validate(id);
    if (valid.error) {
      return err(
        new PrismaClientKnownRequestError("not valid", "P2023", "4.6.1")
      );
    }

    const [result, error] = await this.repo.findById(id);
    if (error) {
      return err(error);
    }

    return ok(this.excludePass(result as user));
  }

  async create(data: Omit<user, "id">) {
    const valid = userSchema.validate(data);

    if (valid.error) {
      return err(valid.error);
    }

    data.password = await this.hashPassword(data.password);

    const [result, error] = await this.repo.create(data);
    if (error || !result) {
      return err(error);
    }

    return ok(this.excludePass(result));
  }

  async update(id: string, data: Partial<user>) {
    let valid = uuidSchema.validate(id);

    if (valid.error) {
      return err(
        new PrismaClientKnownRequestError("not valid", "P2023", "4.6.1")
      );
    }

    valid = userSchema.validate(data);
    if (valid.error) {
      return err(valid.error);
    }

    if (data.password) {
      data.password = await this.hashPassword(data.password);
    }

    const [result, error] = await this.repo.update(id, data);
    if (error || !result) {
      return err(error);
    }

    return ok(this.excludePass(result));
  }

  async delete(id: string) {
    const valid = uuidSchema.validate(id);
    if (valid.error) {
      return err(
        new PrismaClientKnownRequestError("not valid", "P2023", "4.6.1")
      );
    }

    const [result, error] = await this.repo.delete(id);
    if (error) {
      return err(error);
    }

    return ok(result);
  }
}
