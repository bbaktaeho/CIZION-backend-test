import { replaceBandedWord } from "@src/common/utils/banded-word.util";
import { Request, Response, NextFunction } from "express";

export function validateBandedWord(req: Request, _: Response, next: NextFunction) {
  const { body } = req.body;
  const cleanBody = replaceBandedWord(body);
  req.body["body"] = cleanBody;
  next();
}
