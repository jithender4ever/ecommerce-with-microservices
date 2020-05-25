import { CustomError } from "./customError";

export class NotFoundError extends CustomError {
  statusCode = 404;
  constructor() {
    super();
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  formatError() {
    return [
      {
        message: "Route not found",
      },
    ];
  }
}
