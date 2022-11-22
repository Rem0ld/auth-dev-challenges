import AuthService from "./Auth.service";
import { service as RefreshTokenService } from "../RefreshToken/index";
import AuthController from "./Auth.controller";
import UserRepository from "../User/User.repository";
import { prisma } from "../../../prisma/client";
import UserService from "../User/User.service";

const userRepo = new UserRepository(prisma);
const userService = new UserService(userRepo);
export const service = new AuthService(userService, RefreshTokenService);
const controller = new AuthController(service);

export default controller;
