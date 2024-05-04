import { JWT_SECRET_KEY } from "@/config";
import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { TokenExpiredError, verify } from "jsonwebtoken";

interface PayloadToken extends Pick<User, "id"> {}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  const secretKey = JWT_SECRET_KEY!;

  if (!token) {
    return res.status(401).send({ message: "token is missing" });
  }

  verify(token, secretKey, (err, payload) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: "token expired" });
      } else {
        return res.status(401).send({ message: "token invalid" });
      }
    }
    req.body.user = payload as PayloadToken;
    next();
  });
};
