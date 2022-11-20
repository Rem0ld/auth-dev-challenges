import UserRepository from "./User.repository";
import { prisma } from "../../../prisma/client";
import UserService from "./User.service";
import UserController from "./User.controller";

const repo = new UserRepository(prisma);
export const service = new UserService(repo);
const controller = new UserController(service);

export default controller;
