export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract formatError(): {
    message: string;
    field?: string;
  }[];

  constructor() {
    super();

    // Need to do this in TS, since RequestValidationError extends an in-built class.
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
