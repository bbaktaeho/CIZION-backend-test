import { compareSync, hashSync, genSaltSync } from "bcrypt";

export function encryptPassword(password: string) {
  const salt = genSaltSync(11);
  return hashSync(password, salt);
}

export function isPassword(password: string, encryption: string) {
  return compareSync(password, encryption);
}
