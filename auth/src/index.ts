import express from "express";
import { json } from "body-parser";

import { currentUserRouter } from "./routes/currentUser";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { ErrorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(json());

app.listen(4000, () => console.log("Auth Listening on Port: 4000"));

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(ErrorHandler);
