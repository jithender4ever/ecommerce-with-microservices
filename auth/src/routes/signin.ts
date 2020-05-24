import express from "express";

const router = express.Router();

router.get("/api/users/signin", (req, res) => {
  res.send("Signin Router");
});

export { router as signinRouter };
