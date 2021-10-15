import { NextFunction, Request, Response } from "express";
import statusCodes from "http-status-codes";
import DatabaseError from "../model/errors/database.erro.model";
import ForbiddenError from "../model/errors/forbidden.error.model";

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof DatabaseError) {
    res.sendStatus(statusCodes.BAD_REQUEST);
  } else if (error instanceof ForbiddenError) {
    res.sendStatus(statusCodes.FORBIDDEN);
  } else {
    res.sendStatus(statusCodes.INTERNAL_SERVER_ERROR);
  }
}
