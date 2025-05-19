import { selectUserDTO } from '../../application/dtos/user/selectUserDTO.js';
import { database } from '../../shared/config/db.js';

class UserRepository {
  async findAll(limit, offset) {
    try {
      const selectUsersQuery = `
        SELECT ${selectUserDTO.join(', ')}
        FROM users
        WHERE deactivated_at IS NULL
        LIMIT $1 OFFSET $2
      `;

      const { rows } = await database.query(selectUsersQuery, [limit, offset]);

      const total = await this.count();

      return [rows, total];
    } catch (error) {
      error.message = `UserRepository.findAll: ${error.message}`;
      throw error;
    }
  }

  async findOne(id) {
    try {
      const selectUserByIdQuery = `
        SELECT ${selectUserDTO.join(', ')}
        FROM users
        WHERE id = $1 AND deactivated_at IS NULL
      `;

      const { rows } = await database.query(selectUserByIdQuery, [id]);
      return rows;
    } catch (error) {}
  }

  async create(userDTO) {
    const { name, email, password, role, teamId } = userDTO;

    try {
      const insertUserQuery = `
        INSERT INTO users (name, email, hashed_password, role, team_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
      `;

      const { rows } = await database.query(insertUserQuery, [
        name,
        email,
        password,
        role,
        teamId,
      ]);

      return rows[0].id;
    } catch (error) {
      error.message = `UserRepository.create: ${error.message}`;
      throw error;
    }
  }

  async update(userDTO) {}

  async delete(id) {}

  async findByEmail(email) {
    try {
      const selectUserQuery = `
      SELECT ${selectUserDTO.join(', ')} FROM users WHERE email = $1
    `;

      const { rows } = await database.query(selectUserQuery, [email]);

      return rows;
    } catch (error) {}
  }

  async emailExists(email) {
    try {
      const emailExists = await this.findByEmail(email);

      return emailExists.length > 0 ? true : false;
    } catch (error) {
      error.message = `UserRepository.emailExists: ${error.message}`;
      throw error;
    }
  }

  async count() {
    try {
      const usersCountQuery = `
        SELECT count(*)
        FROM users
        WHERE deactivated_at IS NULL
      `;

      const { rows } = await database.query(usersCountQuery);
      return rows[0].count;
    } catch (error) {
      error.message = `UserRepository.count: ${error.message}`;
      throw error;
    }
  }
}

export { UserRepository };
