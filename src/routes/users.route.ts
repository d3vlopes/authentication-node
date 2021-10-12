import { Router, Request, Response, NextFunction } from 'express'
import statusCodes from 'http-status-codes'

import userRepository from '../repositories/user.repository'

export const usersRoute = Router()

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  const users = await userRepository.findAllUsers()

  res.status(statusCodes.OK).send(users)
})

usersRoute.get('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
  const uuid = req.params.uuid
  const user = await userRepository.findById(uuid)

  res.status(statusCodes.OK).send(user)
})

usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
  const newUser = req.body
  const uuid = await userRepository.create(newUser)

  res.status(statusCodes.CREATED).send(uuid)
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