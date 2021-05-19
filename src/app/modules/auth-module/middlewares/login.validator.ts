import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { Exception } from "@src/common/exceptions/exception";

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export async function validateLogin(req: Request, res: Response, next: NextFunction) {
  try {
    await userSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(Exception.new(400, error.message));
  }
}
