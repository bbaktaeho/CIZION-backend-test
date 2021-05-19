import { createConnection } from "typeorm";
import { dbConfig } from "../common/configs/db.config";
import logger from "../common/utils/log.util";
import { Comment } from "./entities/comment.entity";
import { Post } from "./entities/post.entity";
import { User } from "./entities/user.entity";

export async function getDBConnection() {
  const entities = [User, Post, Comment];

  return await createConnection({
    ...dbConfig,
    type: "mysql",
    entities: entities,
    synchronize: true,
  })
    .then(_ => logger.verbose("데이터베이스 연동"))
    .catch(err => logger.error(err.message));
}
