import express from 'express'

import { statusRoute } from './routes/status.route'
import { usersRoute } from './routes/users.route'


const app = express()

// Configurações da aplicação
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Configuração das rotas
app.use(usersRoute)
app.use(statusRoute)

// Inicialização do servidor
app.listen(3000, () => {
  console.log('Rodando na porta 3000')
})
