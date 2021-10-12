import { Pool } from 'pg'

const connectionString = ""

export const db = new Pool( { connectionString })
