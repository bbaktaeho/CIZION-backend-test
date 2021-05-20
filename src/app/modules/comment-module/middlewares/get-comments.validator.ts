import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { Exception } from "@src/common/exceptions/exception";

const commentSchema = Joi.object({
  postId: Joi.number().required(),
});

export async function validateComments(req: Request, res: Response, next: NextFunction) {
  try {
    await commentSchema.validateAsync(req.body);
    next();
  } catch (err) {
    next(Exception.new(400, err.message));
  }
}
