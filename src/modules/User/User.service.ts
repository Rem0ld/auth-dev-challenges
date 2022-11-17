import { user } from "@prisma/client";
import { Result, TResultService } from "../../global";
import { err, ok, promisifier } from "../../utils/promisifier";
import UserRepository from "./User.repository";

export default class UserService {
  constructor(private repo: UserRepository) {}

  async findAll(limit: string, skip: string, rest?: Record<string, any>) {
    const [result, error] = await promisifier<TResultService<user>>(
      this.repo.findAll(+limit, +skip, rest)
    );

    if (error) {
      return err(new Error(error));
    }

    return ok(result);
  }

  async findById(id: number): Promise<Result<user, Error>> {
    throw new Error("Method not implemented.");
  }

  async create(data: Partial<user>): Promise<Result<user, Error>> {
    throw new Error("Method not implemented.");
  }

  async createMany(data: Partial<user>[]): Promise<user[]> {
    throw new Error("Method not implemented.");
  }

  async update(id: number, data: Partial<user>): Promise<user> {
    throw new Error("Method not implemented.");
  }

  async delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getCount(): Promise<number> {
    throw new Error("Method not implemented.");
  }
}
