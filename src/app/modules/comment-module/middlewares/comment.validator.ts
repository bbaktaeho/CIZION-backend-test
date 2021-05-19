import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const pattern = /^시.?발$/;

const commentSchema = Joi.object({
  body: Joi.string().regex(pattern).required(),
});

export async function validateComment(req: Request, res: Response, next: NextFunction) {
  try {
    await commentSchema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(400);
    next(error);
  }
}
