import { Router, Request, Response, NextFunction } from "express";
import statusCodes from 'http-status-codes'

export const statusRoute = Router()

statusRoute.get('/status', (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(statusCodes.OK)
})