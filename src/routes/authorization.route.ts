import JWT from "jsonwebtoken";
import statusCode from "http-status-codes";
import { Request, Response, NextFunction, Router } from "express";

import ForbiddenError from "../model/errors/forbidden.error.model";
import { basicAuthenticationMiddleware } from "../middleware/basic-authentication.middleware";
import { JwtAuthenticationMiddleware } from "../middleware/jwt.authentication.middleware";

export const authorizationRoute = Router();

authorizationRoute.post(
  "/token",
  basicAuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        throw new ForbiddenError("Usuário não informado!");
      }

      const payload = { username: user?.username };
      const options = { subject: user?.uuid };
      const secretKey = "my_secret_key";

      const jwt = JWT.sign(payload, secretKey, options);

      res.status(statusCode.OK).json({ token: jwt });
    } catch (error) {
      next(error);
    }
  }
);

authorizationRoute.post(
  "/token/validate",
  JwtAuthenticationMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(statusCode.OK)
  }
);
