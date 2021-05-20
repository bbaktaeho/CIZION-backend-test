import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { Exception } from "@src/common/exceptions/exception";

// const pattern = /^시.?발$/;

const commentSchema = Joi.object({
  body: Joi.string().required(),
  path: Joi.string().uri(),
  postId: Joi.number(),
});

export async function validateComment(req: Request, res: Response, next: NextFunction) {
  try {
    await commentSchema.validateAsync(req.body);
    next();
  } catch (err) {
    next(Exception.new(400, err.message));
  }
}
