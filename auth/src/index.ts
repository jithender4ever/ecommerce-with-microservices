import { json } from "body-parser";
import express from "express";
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
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // secure: true, ** Using HTTP since there is an SSL error with HTTPS **
  })
);

const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (err) {
    console.error(err);
  }
  app.listen(4000, () => console.log("Auth Listening on Port: 4000"));
};

start();

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
