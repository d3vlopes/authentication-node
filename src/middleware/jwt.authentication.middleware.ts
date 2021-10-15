import JWT from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import ForbiddenError from "../model/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";

export async function JwtAuthenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      throw new ForbiddenError("Credenciais não informadas");
    }

    const [authenticationType, token] = authorizationHeader.split(" ");

    if (authenticationType !== "Bearer" || !token) {
      throw new ForbiddenError("Tipo de autenticação inválido");
    }

    try {
      //Verifica se o token é válido
      const tokenPayload = JWT.verify(token, "my_secret_key");

      // Verifica se o tokenPayload é um objeto
      if (typeof tokenPayload !== "object" || !tokenPayload.sub) {
        throw new ForbiddenError("Token Inválido");
      }

      const user = {
        uuid: tokenPayload.sub,
        username: tokenPayload.username as string,
      };

      req.user = user;
      next();
    } catch (error) {
      throw new ForbiddenError("Token Inválido");
    }
  } catch (error) {
    next(error);
  }
}
