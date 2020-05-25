import { ValidationError } from "express-validator";
import { CustomError } from "./customError";

export class RequestValidationError extends CustomError {
  errors: ValidationError[];
  statusCode = 400;
  constructor(errors: ValidationError[]) {
    super();
    this.errors = errors;

    // Need to do this in TS, since RequestValidationError extends ab in-built class - Error.
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  formatError() {
    return this.errors.map((e) => {
      return {
        message: e.msg,
        field: e.param,
      };
    });
  }
}
