import { Request, Response, NextFunction } from "express";
import { Exception } from "../../../common/exceptions/exception";
import logger from "../../../common/utils/log.util";

/**
 * 에러 핸들링
 * @description 요청 처리에서 발생하는 모든 예외를 핸들링한다.
 */
export function errorHandling(err: Exception, req: Request, res: Response, _: NextFunction) {
  logger.error(err.message);

  return res.status(err.statusCode).json({ message: err.message });
}
