import { PrismaClient, user } from "@prisma/client";
import { BaseRepository, TResultService } from "../../global";

export default class UserRepository implements BaseRepository<user> {
  constructor(private client: PrismaClient) {}

  async create(data: Partial<user>): Promise<user> {
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

  async findById(id: number): Promise<user> {
    throw new Error("Method not implemented.");
  }
}
