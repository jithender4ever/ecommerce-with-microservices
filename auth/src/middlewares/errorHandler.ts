import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/customError";

export const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({
      errors: err.formatError(),
    });
  }

  res.status(400).send({
    errors: [
      {
        message: err.message || "Something went wrong!",
      },
    ],
  });
};
