import { User } from "../model/user.model";
import { db } from "../db";

class UserRepository {
  async findAllUsers() {
    const query = `
      SELECT uuid, username
      FROM application_user
    `;

     const result = await db.query<User>(query)
     const rows = result.rows

    return rows || [];
  }
}

export default new UserRepository();
