import { container } from "../di/container";
import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import cors from "cors";
import morgan from "morgan";
import logger from "../common/utils/log.util";
import { errorHandling } from "./middlewares/error/route.error";

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
      })
      .setErrorConfig(app => {
        app.use(errorHandling);
      });
    logger.verbose("미들웨어 등록");

    // 서버 실행
    server.build().listen(process.env.PORT, () => {
      logger.info("서버 실행");
    });
  }
}
