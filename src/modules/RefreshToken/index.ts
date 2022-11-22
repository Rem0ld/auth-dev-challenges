import RefreshTokenService from "./RefreshToken.service";
import RefreshTokenRepository from "./RefreshToken.repository";
import { prisma } from "../../../prisma/client";

const repo = new RefreshTokenRepository(prisma);
export const service = new RefreshTokenService(repo);
