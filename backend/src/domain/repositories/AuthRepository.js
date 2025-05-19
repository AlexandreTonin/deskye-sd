import { database } from '../../shared/config/db.js';

class AuthRepository {
  async login(id) {
    try {
      const updateLastLoginDateQuery = `
            UPDATE users 
            SET last_login_at = CURRENT_TIMESTAMP 
            WHERE id = $1
        `;

      await database.query(updateLastLoginDateQuery, [id]);

      return;
    } catch (error) {
      error.message = `AuthRepository.login: ${error.message}`;
      throw error;
    }
  }

  async register(registerDTO) {}

  async resetPassword(resetPasswordDTO) {}

  async confirmEmail(confirmEmailDTO) {}

  async refresh() {}
}

export { AuthRepository };
