import { User } from "../model/user.model";
import { db } from "../db";

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
    const [newUser] = rows
    
    return newUser.uuid
  }
}

export default new UserRepository();
