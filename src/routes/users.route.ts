import { Router, Request, Response, NextFunction } from 'express'
import statusCodes from 'http-status-codes'

export const usersRoute = Router()

usersRoute.get('/users', (req: Request, res: Response, next: NextFunction) => {
  const users = [{ userName: 'Leandro' }]

  res.status(statusCodes.OK).send(users)
})

usersRoute.get('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid

  res.status(statusCodes.OK).send({ uuid })
})

usersRoute.post('/users', (req: Request, res: Response, next: NextFunction) => {
  const newUser = req.body

  res.status(statusCodes.CREATED).send(newUser)
})

usersRoute.put('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid
  const modifiedUser = req.body

  modifiedUser.uuid = uuid

  res.status(statusCodes.OK).send(modifiedUser)
})

usersRoute.delete('/users/:uuid', (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(statusCodes.OK)
})