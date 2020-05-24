import express from "express";

const router = express.Router();

router.get("/api/users/signout", (req, res) => {
  res.send("Signout Router");
});

export { router as signoutRouter };
