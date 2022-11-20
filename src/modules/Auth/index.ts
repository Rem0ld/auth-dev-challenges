import AuthService from "./Auth.service";
import { service as UserService } from "../User/index";
import AuthController from "./Auth.controller";

const service = new AuthService(UserService);
const controller = new AuthController(service);

export default controller;
