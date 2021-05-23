import { container } from "../di/container";
import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import cors from "cors";
import morgan from "morgan";
import { errorHandling } from "./middlewares/error/route.error";
import logger from "@src/common/utils/log.util";
import "dotenv/config";
import { serverConfig } from "@src/common/configs/server.config";
import path from "path";

export class App {
  setup() {
    // 서버 생성
    const server = new InversifyExpressServer(container, null, { rootPath: "/api" });

    // 미들웨어 등록
    server
      .setConfig(app => {
        app.use(cors());
        app.use(morgan("dev"));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use("/upload", express.static(path.join(__dirname, "../../upload/")));
      })
      .setErrorConfig(app => {
        app.use(errorHandling);
      });
    logger.verbose("미들웨어 등록");

    // 서버 실행
    server.build().listen(serverConfig.port, () => {
      logger.info(`http://${serverConfig.host}:${serverConfig.port}/ 서버 실행`);
    });
  }
}
