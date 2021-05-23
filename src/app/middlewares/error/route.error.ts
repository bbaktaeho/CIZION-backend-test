import { Exception } from "@src/common/exceptions/exception";
import logger from "@src/common/utils/log.util";
import { Request, Response, NextFunction } from "express";

/**
 * 에러 핸들링
 * @description 요청 처리에서 발생하는 모든 예외를 핸들링한다.
 */
export function errorHandling(err: Error, req: Request, res: Response, _: NextFunction) {
  logger.error(err.message);

  if (err instanceof Exception) res.status(err.statusCode)
  else res.status(500);

  res.json({ message: err.message });
}
