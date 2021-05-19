import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { Exception } from "../../../common/exceptions/exception";

const postSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
});

export async function validatePost(req: Request, res: Response, next: NextFunction) {
  try {
    await postSchema.validateAsync(req.body);
    next();
  } catch (err) {
    next(Exception.new(400, err.message));
  }
}
