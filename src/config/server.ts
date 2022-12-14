import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../docs/swagger.json";

import { Server } from "@overnightjs/core";
import { logger } from "../utils/logger/logger";
import routes from "../modules";

export default class MyServer extends Server {
  constructor() {
    super(process.env.NODE_ENV === "development");
    dotenv.config();
    this.showLogs = true;
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(morgan("combined"));
    this.app.use(cors());
    this.setupController();
    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  private setupController(): void {
    logger.info("Setting up controllers");
    super.addControllers(routes);
  }

  public start(port: string): void {
    this.app.listen(port, () => {
      logger.info(`Listening on ${port}`);
      logger.info(`Environment is ${process.env.NODE_ENV}`);
    });
  }
}
