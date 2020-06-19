import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { BadRequestError } from "../errors/badRequestError";
import { validateRequest } from "../middlewares/validateRequest";
import { Password } from "../utils/password";
import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";
import { SIGNIN_ROUTE } from "./constants";

const router = express.Router();

router.post(
  SIGNIN_ROUTE,
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password cannot be empty"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestError("Invalid credentials!");
    }

    const isPasswordValid = await Password.compare(user.password, password);

    if (!isPasswordValid) {
      throw new BadRequestError("Invalid credentials!");
    }

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

    res.status(200).send(user);
  }
);

export { router as signinRouter };
