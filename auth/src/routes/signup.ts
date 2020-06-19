import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/badRequestError";
import { RequestValidationError } from "../errors/requestValidationError";
import { User } from "../models/user";

import { JWT_SECRET } from "../config";
import { validateRequest } from "../middlewares/validateRequest";
import { SIGNUP_ROUTE } from "./constants";
const router = express.Router();

router.post(
  SIGNUP_ROUTE,
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim() // sanitization
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
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
      JWT_SECRET
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
