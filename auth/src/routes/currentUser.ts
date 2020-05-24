import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  res.send("Currentuser Router");
});

export { router as currentUserRouter };
