import { CustomError } from "./customError";

export class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(message: string) {
    super();
    this.message = message;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  formatError() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
