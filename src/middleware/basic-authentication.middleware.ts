import { NextFunction, Request, Response } from "express";

import ForbiddenError from "../model/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";

export async function basicAuthenticationMiddleware(
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

    if (!user) {
      throw new ForbiddenError("Usuário ou senha inválidos!");
    }

    req.user = user

    // Envia para a função depois do middleware dentro das routes
    next()
  } catch (error) {
    next(error);
  }
}
