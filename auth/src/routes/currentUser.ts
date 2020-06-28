import express from "express";
import { currentUser } from "../middlewares/currentUser";
import { CURRENTUSER_ROUTE } from "./constants";

const router = express.Router();

router.get(CURRENTUSER_ROUTE, currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
