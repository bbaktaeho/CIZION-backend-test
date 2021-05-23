import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { Exception } from "@src/common/exceptions/exception";

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  nickname: Joi.string().required(),
  password: Joi.string().required(),
});

export async function validateRegister(req: Request, res: Response, next: NextFunction) {
  try {
    await userSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(Exception.new(400, error.message));
  }
}
