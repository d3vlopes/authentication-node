import express, { Request, Response, NextFunction } from 'express'
import { usersRoute } from './routes/users.route'

const app = express()

// Configurações da aplicação
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Configuração das rotas
app.use(usersRoute)

// Inicialização do servidor
app.listen(3000, () => {
  console.log('Rodando na porta 3000')
})
