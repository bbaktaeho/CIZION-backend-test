import "express";
import { IUser } from "../../common/interfases/user.interface";

declare module "express" {
  interface Request {
    user?: IUser;
  }
}
