require('dotenv/config')
import { Pool } from 'pg'

const connectionString = process.env.DB_CONNECTION

export const db = new Pool( { connectionString })
