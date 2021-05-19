import "reflect-metadata";
import { App } from "./app/app";
import { getDBConnection } from "./database/connection.db";
import dotenv from "dotenv";

// controllers
import "./app/controllers";

// 환경 변수
const env = dotenv.config();
if (env.error) throw new Error(".env 파일이 없음");

export async function bootstrap() {
  // 데이터베이스 연동 후 익스프레스 애플리케이션 실행
  await getDBConnection();
  new App().setup();
}

bootstrap();
