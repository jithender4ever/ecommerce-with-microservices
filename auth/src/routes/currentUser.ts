import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  // This if is equivalent to "!req.session || !req.session.jwt"
  if (!req.session?.jwt) {
    res.send({ currentuser: null });
  }

  try {
    const payload = jwt.verify(req.session?.jwt, JWT_SECRET);
    res.send({ currentUser: payload });
  } catch (e) {
    res.send({ currentuser: null });
  }
});

export { router as currentUserRouter };
