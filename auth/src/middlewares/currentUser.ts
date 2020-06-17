import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

interface IdentityPayload {
  id: string;
  email: string;
}

// Augment the Request type, so it can contain currentUser property optionally.
declare global {
  namespace Express {
    interface Request {
      currentUser?: IdentityPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // This if is equivalent to "!req.session || !req.session.jwt"
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const jwtPayload = jwt.verify(
      req.session.jwt,
      JWT_SECRET
    ) as IdentityPayload;
    req.currentUser = jwtPayload;
  } catch (e) {}

  next();
};
