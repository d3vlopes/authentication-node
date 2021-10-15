import express from "express";

import { JwtAuthenticationMiddleware } from "./middleware/jwt.authentication.middleware";
import { errorHandler } from "./middleware/error-handler.middleware";

import { authorizationRoute } from "./routes/authorization.route";
import { statusRoute } from "./routes/status.route";
import { usersRoute } from "./routes/users.route";

const app = express();

// Configurações da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração das rotas
app.use(statusRoute);
app.use(authorizationRoute);

// Adiciona o middlweare de bearer para os endpoints da rota de users
app.use(JwtAuthenticationMiddleware)
app.use( usersRoute);

// Configurações dos handlers de erro
app.use(errorHandler);

// Inicialização do servidor
app.listen(3000, () => {
  console.log("Rodando na porta 3000");
});
