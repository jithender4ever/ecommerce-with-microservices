import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";

import { currentUserRouter } from "./routes/currentUser";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { ErrorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./errors/notFoundError";
import { User } from "./models/user";

const app = express();
app.use(json());

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
