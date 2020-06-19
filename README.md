## Notes

- This project is written in `TypeScript`.
- `tsc --init` will create a `tsconfig.json` file.
- `ts-node-dev` to compile TS files and start dev server.
- Uses `express-validator` to validate and sanitize the request parameters, request body, request query strings, etc.
- Uses `express-async-errors` to handle errors in case of `asynchronous` requests. This will alleviate the developers from having to call `next()` function to handle errors in case of async requests.
- Uses `mongodb` and runs the db locally.

### Tests

- Uses `Jest` as test runner. For `ts` support, uses `ts-jest` library.

## Interesting Patterns/Concepts

### Error Handling

- To define new errors, create a new error class and have it extend `CustomError` class.
- Notice how a `CustomError` abstract class has been created to maintain the consistency of the error object shape being returned to the clients. (We could have defined `CustomError` to be an interface, but doing so will require checking for instance of individual error types (`RequestValidationError`, `DBError` etc) in the middleware.
- Also, by using a `CustomError` abstract class and having all kinds of error classes extend this abstract class, the responsbility of formatting the errors is offloaded from the middleware to the individual error types.
- One last thing is that `CustomError` extends `Error` to be able to use all the built in capabilities of JavaScript Error object.
