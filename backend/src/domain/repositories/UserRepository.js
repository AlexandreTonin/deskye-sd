import { selectUserDTO } from '../../application/dtos/user/selectUserDTO.js';
import { database } from '../../shared/config/db.js';

class UserRepository {
  async findAll() {}

  async findOne(id) {}

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
}

export { UserRepository };
