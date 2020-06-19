import "express-async-errors";
import mongoose from "mongoose";

import { app } from "./app";

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
