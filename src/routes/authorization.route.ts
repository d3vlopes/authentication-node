import JWT from "jsonwebtoken";
import statusCode from "http-status-codes";
import { Request, Response, NextFunction, Router } from "express";

import ForbiddenError from "../model/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";

export const authorizationRoute = Router();

authorizationRoute.post(
  "/token",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authorizationHeader = req.headers["authorization"];

      if (!authorizationHeader) {
        throw new ForbiddenError("Credenciais não informadas");
      }

      const [authenticationType, token] = authorizationHeader.split(" ");

      if (authenticationType !== "Basic" || !token) {
        throw new ForbiddenError("Tipo de autenticação inválido");
      }

      // converte o token para base64
      const tokenContent = Buffer.from(token, "base64").toString("utf-8");

      const [username, password] = tokenContent.split(":");

      if (!username || !password) {
        throw new ForbiddenError("Creadenciais não preenchidas");
      }

      // Busca o usuário no banco de dodos
      const user = await userRepository.findByUsernameAndPassword(
        username,
        password
      );

      const payload = { username: user.username };
      const options = { subject: user?.uuid };
      const secretKey = "my_secret_key";

      const jwt = JWT.sign(payload, secretKey, options);

      res.status(statusCode.OK).json({ token: jwt });
    } catch (error) {
      next(error);
    }
  }
);
