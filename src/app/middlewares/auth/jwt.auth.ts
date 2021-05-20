import { Exception } from "@src/common/exceptions/exception";
import { encryptJWT } from "@src/common/utils/jwt.util";
import { IUser } from "@src/interfases/user.interface";
import { Request, Response, NextFunction } from "express";

export function auth(req: Request, _: Response, next: NextFunction) {
  const accessToken = req.headers.authorization;
  if (!accessToken) next(Exception.new(403, "토큰이 없음"));
  else {
    const user = encryptJWT(accessToken);
    if (!user) next(Exception.new(401, "사용 불가"));
    req.user = user as IUser;
    next();
  }
}
