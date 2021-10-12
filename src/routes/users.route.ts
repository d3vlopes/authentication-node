import { Router, Request, Response, NextFunction } from "express";
import statusCodes from "http-status-codes";
import DatabaseError  from "../model/errors/database.erro.model";

import userRepository from "../repositories/user.repository";

export const usersRoute = Router();

usersRoute.get(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();

    res.status(statusCodes.OK).send(users);
  }
);

usersRoute.get(
  "/users/:uuid",
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
      const uuid = req.params.uuid;
      const user = await userRepository.findById(uuid);

      res.status(statusCodes.OK).send(user);
    } catch (error) {
      // Executa o middleware de erro
     next(error)
    }
  }
);

usersRoute.post(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    const uuid = await userRepository.create(newUser);

    res.status(statusCodes.CREATED).send(uuid);
  }
);

usersRoute.put(
  "/users/:uuid",
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedUser = req.body;

    modifiedUser.uuid = uuid;

    await userRepository.update(modifiedUser);

    res.status(statusCodes.OK).send();
  }
);

usersRoute.delete(
  "/users/:uuid",
  async (req: Request, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;

    await userRepository.remove(uuid);
    res.sendStatus(statusCodes.OK);
  }
);
