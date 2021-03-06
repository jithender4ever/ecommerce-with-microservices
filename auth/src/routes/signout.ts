import express from "express";
import { SIGNOUT_ROUTE } from "./constants";

const router = express.Router();

router.post(SIGNOUT_ROUTE, (req, res) => {
  req.session = null;
  res.send({});
});

export { router as signoutRouter };
