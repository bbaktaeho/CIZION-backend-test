import { Exception } from "@src/common/exceptions/exception";
import { isBandedWords } from "@src/common/utils/banded-word.util";
import { Request, Response, NextFunction } from "express";

export function validateBandedWord(req: Request, _: Response, next: NextFunction) {
  const { body } = req.body;
  if (isBandedWords(body)) throw Exception.new(400, "금지어 존재");
  next();
}
