import { PrismaClient, refresh_token } from "@prisma/client";
import { Result } from "../../global";
import { err, ok, promisifier } from "../../utils/promisifier";

export default class RefreshTokenRepository {
  constructor(private client: PrismaClient) {}

  async findByUserIdAndDevice(
    userId: string,
    deviceName: string
  ): Promise<Result<{ expiresAt: Date; refreshToken: string }, Error>> {
    const [result, error] = await promisifier<{
      expiresAt: Date;
      refreshToken: string;
    }>(
      this.client.refresh_token.findFirstOrThrow({
        where: {
          device: deviceName,
          userId,
        },
        select: {
          expiresAt: true,
          refreshToken: true,
        },
      })
    );
    if (error) {
      return err(error);
    }

    return ok(result);
  }

  async create(data: Omit<refresh_token, "id">) {
    const [result, error] = await promisifier<refresh_token>(
      this.client.refresh_token.create({
        data,
      })
    );
    if (error) {
      return err(error);
    }

    return ok(result);
  }

  async update(
    userId: string,
    deviceName: string,
    data: Partial<refresh_token>
  ) {
    const [result, error] = await promisifier<refresh_token>(
      this.client.refresh_token.update({
        where: {
          userId_device: {
            userId,
            device: deviceName,
          },
        },
        data,
      })
    );
    if (error) {
      return err(error);
    }

    return ok(result);
  }

  async delete(userId: string, deviceName: string) {
    console.log(userId, deviceName);
    const [_, error] = await promisifier(
      this.client.refresh_token.delete({
        where: {
          userId_device: {
            userId,
            device: deviceName,
          },
        },
      })
    );
    if (error) {
      return err(error);
    }

    return ok(null);
  }
}
