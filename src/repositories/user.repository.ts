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
    `

    // passa os parâmetros para a query
    const values = [uuid]

    const { rows } = await db.query<User>(query, values)
    const [ user ] = rows

    return user
  }
}

export default new UserRepository();
