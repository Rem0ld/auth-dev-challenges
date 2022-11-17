import { user } from "@prisma/client";
import { IService, Result, TResultService } from "../../global";
import { err, ok, promisifier } from "../../utils/promisifier";
import UserRepository from "./User.repository";

export default class UserService implements IService<user> {
  constructor(private repo: UserRepository) {}

  async getCount() {
    return this.repo.getCount();
  }

  async findAll(limit: string, skip: string, rest?: Record<string, any>) {
    const [result, error] = await promisifier<TResultService<user>>(
      this.repo.findAll(+limit, +skip, rest)
    );

    if (error) {
      return err(new Error(error));
    }

    return ok(result);
  }

  async findById(id: string) {
    const [result, error] = await this.repo.findById(id);
    if (error) {
      return err(error);
    }

    return ok(result);
  }

  async create(data: Omit<user, "id">) {
    const [result, error] = await this.repo.create(data);
    if (error) {
      return err(error);
    }

    return ok(result);
  }

  async update(id: string, data: Partial<user>) {
    const [result, error] = await this.repo.update(id, data);
    if (error) {
      return err(error);
    }

    return ok(result);
  }

  async delete(id: string) {
    const [result, error] = await this.repo.delete(id);
    if (error) {
      return err(error);
    }

    return ok(result);
  }
}
