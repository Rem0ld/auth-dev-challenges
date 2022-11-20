import { Result } from "../../global";
import { err, ok } from "../../utils/promisifier";
import RefreshTokenRepository from "./RefreshToken.repository";
import { randomUUID } from "crypto";

type TDateUnit = "minute" | "hours" | "month";

export default class RefreshTokenService {
  constructor(private repo: RefreshTokenRepository) {}

  generateExpiryDate(unit: TDateUnit, value: number) {
    let date = new Date();
    let curr = 0;

    switch (unit) {
      case "minute":
        curr = date.getMinutes();
        date = new Date(date.setMinutes(curr + value));
        break;
      case "hours":
        curr = date.getHours();
        date = new Date(date.setHours(curr + value));
        break;
      default:
        curr = date.getMonth();
        date = new Date(date.setMonth(curr + value));
        break;
    }

    return date;
  }

  async findOne(
    userId: string,
    deviceName: string
  ): Promise<Result<boolean, Error>> {
    const [result, error] = await this.repo.findByUserIdAndDevice(
      userId,
      deviceName
    );
    if (error || !result) {
      return err(error);
    }

    // Check if token exists and if it's not expired
    if (!result.refreshToken) {
      return ok(false);
    }
    console.log(result.expiresAt);
    if (result.expiresAt.toString() > Date.now().toString()) {
      // It is expired
      return ok(false);
    }

    return ok(true);
  }

  async create(
    userId: string,
    deviceName: string
  ): Promise<Result<null, Error>> {
    const refreshToken = randomUUID();
    const expiresAt = this.generateExpiryDate("month", 3);

    // @ts-ignore
    const [_, error] = await this.repo.create({
      userId,
      device: deviceName,
      expiresAt,
      refreshToken,
    });
    if (error) {
      return err(error);
    }

    return ok(null);
  }
}
