import { Request, Response, NextFunction } from "express";
import { encryptJWT } from "../../../common/utils/jwt.util";
import { Exception } from "../../../common/exceptions/exception";
import { IUser } from "../../../common/interfases/user.interface";

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
