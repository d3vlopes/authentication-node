import { User } from "../model/user.model";
import { db } from "../db";
import DatabaseError from "../model/errors/database.erro.model";

class UserRepository {
  async findAllUsers() {
    const query = `
      SELECT uuid, username
      FROM application_user
    `;

    const { rows } = await db.query<User>(query);

    return rows || [];
  }

  async findById(uuid: string) {
    try {
      const query = `
        SELECT uuid, username
        FROM application_user
        WHERE uuid = $1
      `;

      // passa os parâmetros para a query
      const values = [uuid];
      const { rows } = await db.query<User>(query, values);
      const [user] = rows;

      return user;
    } catch (error) {
      throw new DatabaseError("Erro na consulta pro ID", error);
    }
  }

  async findByUsernameAndPassword(username: string, password: string) {
    const query = `
      SELECT uuid, username
      FROM application_user
      WHERE username = $1
      AND password = crypt($2, 'my_salt')
    `;

    const values = [username, password];
    const { rows } = await db.query<User>(query, values);
    const [user] = rows;
    
    return user || null;
  }

  async create(user: User) {
    const query = `
      INSERT INTO application_user (
        username,
        password
      )
      VALUES ($1, crypt($2, 'my_salt'))
      RETURNING uuid
    `;

    const values = [user.username, user.password];
    const { rows } = await db.query<{ uuid: string }>(query, values);
    const [newUser] = rows;

    return newUser.uuid;
  }

  async update(user: User) {
    const query = `
      UPDATE application_user 
      SET username = $1, password = crypt($2, 'my_salt')
      WHERE uuid = $3
    `;

    const values = [user.username, user.password, user.uuid];
    await db.query(query, values);
  }

  async remove(uuid: string) {
    const query = `
      DELETE FROM application_user
      WHERE uuid = $1 
    `;

    const values = [uuid];
    await db.query<{ uuid: string }>(query, values);
  }
}

export default new UserRepository();
