import { User } from "../model/user.model";

// extende a interface Request do express
declare module 'express-serve-static-core' {
  interface Request {
    user?: User | null
  }
}
