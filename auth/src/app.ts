import { json } from "body-parser";
import express from "express";
import cors from "cors";
import "express-async-errors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import { NotFoundError } from "./errors/notFoundError";
import { ErrorHandler } from "./middlewares/errorHandler";
import { currentUserRouter } from "./routes/currentUser";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = express();
app.use(cors());
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // secure: true, ** Using HTTP since there is an SSL error with HTTPS **
  })
);

// Individual route handlers
app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

// Default handler for unknown routes.
app.all("*", () => {
  throw new NotFoundError();
});

// Error handler middleware
app.use(ErrorHandler);

export { app };
