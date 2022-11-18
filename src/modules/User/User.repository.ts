import { PrismaClient, user } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { BaseRepository, Result, TResultService } from "../../global";
import { err, ok, promisifier } from "../../utils/promisifier";

export default class UserRepository implements BaseRepository<user> {
  constructor(private client: PrismaClient) {}

  async getCount(): Promise<number> {
    return this.client.user.count();
  }

  async create(data: Omit<user, "id">) {
    const [result, error] = await promisifier<user>(
      this.client.user.create({
        data,
      })
    );
    if (error) {
      return err(new Error(error));
    }

    return ok(result);
  }

  async update(id: string, data: Partial<user>) {
    const [result, error] = await promisifier<user>(
      this.client.user.update({
        where: {
          id,
        },
        data,
      })
    );
    if (error) {
      return err(new Error(error));
    }

    return ok(result);
  }

  async delete(id: string): Promise<Result<null, Error>> {
    const [_, error]: [any, PrismaClientKnownRequestError] = await promisifier(
      this.client.user.delete({
        where: {
          id: id,
        },
      })
    );
    if (error) {
      return err(error);
    }

    return ok(null);
  }

  async findAll(
    limit: number,
    skip: number,
    rest?: Record<string, any>
  ): Promise<TResultService<user>> {
    const [count, users] = await this.client.$transaction([
      this.client.user.count(),
      this.client.user.findMany({
        take: limit,
        skip,
      }),
    ]);

    return {
      data: users,
      total: count,
    };
  }

  async findById(id: string) {
    const [user, error] = await promisifier<user>(
      this.client.user.findFirstOrThrow({
        where: {
          id,
        },
      })
    );
    if (error) {
      return err(error);
    }

    return ok(user);
  }
}
