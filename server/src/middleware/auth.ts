import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ITokenPayload } from "../types/custom";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied, token missing");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimStart();
    }

    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as ITokenPayload;

    req.user = verified;
    next();
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};
