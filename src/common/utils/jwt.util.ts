import { IUser } from "@src/interfases/user.interface";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../configs/jwt.config";

export function encryptJWT(accessToken: string) {
  const [type, token] = accessToken.split(" ");
  if (type !== "Bearer") return null;
  return jwt.verify(token, jwtConfig.secret);
}

export function generateAccessToken(user: IUser) {
  const { id, email, nickname } = user;
  return jwt.sign({ id, email, nickname }, jwtConfig.secret, { expiresIn: jwtConfig.accessTokenExpiresIn });
}
