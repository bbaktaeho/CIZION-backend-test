import jwt from "jsonwebtoken";
import { jwtConfig } from "../configs/jwt.config";
import { IUser } from "../interfases/user.interface";

export function encryptJWT(accessToken: string) {
  const [type, token] = accessToken.split(" ");
  if (type !== "Bearer") return null;
  return jwt.verify(token, jwtConfig.secret);
}

export function createUserToken(user: IUser) {
  const { id, email, nickname } = user;
  return jwt.sign({ id, email, nickname }, jwtConfig.secret, { expiresIn: jwtConfig.accessTokenExpiresIn });
}
