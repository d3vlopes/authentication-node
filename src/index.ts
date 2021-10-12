import express, { Request, Response, NextFunction } from 'express'

const app = express()

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ foo: 'bar' })
})

app.listen(3000, () => {
  console.log('Rodando na porta 3000')
})
