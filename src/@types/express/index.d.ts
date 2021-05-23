import "express";
import { IUser } from "../../interfases/user.interface";

declare module "express" {
  interface Request {
    user?: IUser;
  }
}
