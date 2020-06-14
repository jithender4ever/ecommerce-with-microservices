import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/badRequestError";
import { RequestValidationError } from "../errors/requestValidationError";
import { User } from "../models/user";

import { JWT_SECRET } from "../config";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim() // sanitization
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email already exists!");
    }

    const user = User.build({
      email,
      password,
    });

    await user.save();

    // Generate JWT and save it to the session object on cookie
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET // Need to be a secret and not a plain text. But since this app is only being run locally, did not make it a k8s secret.
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
