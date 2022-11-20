import { PrismaClient, user } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import {
  BaseRepository,
  Result,
  Tcredentials,
  TResultService,
} from "../../global";
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
      return err(error);
    }

    return ok(result as user);
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
      return err(error);
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
  ): Promise<Result<TResultService<user>, Error>> {
    const [result, error]: [any, any] = await promisifier(
      this.client.$transaction([
        this.client.user.count(),
        this.client.user.findMany({
          take: limit,
          skip,
        }),
      ])
    );
    if (error) {
      return err(error);
    }

    return ok({
      data: result[1],
      total: result[0],
    });
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

  async findByEmail(email: string): Promise<Result<Tcredentials, Error>> {
    const [user, error] = await promisifier<Tcredentials>(
      this.client.user.findFirstOrThrow({
        where: {
          email,
        },
        select: {
          id: true,
          email: true,
          password: true,
        },
      })
    );
    if (error) {
      return err(error);
    }

    return ok(user);
  }
}
