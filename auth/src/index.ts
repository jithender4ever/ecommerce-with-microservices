import express from "express";
import { json } from "body-parser";

const app = express();
app.use(json());

app.listen(4000, () => console.log("Auth Listening on Port: 4000"));

app.get("/", () => console.log("Hi"));
