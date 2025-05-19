import { selectTeamDTO } from '../../application/dtos/team/selectTeamDTO.js';
import { database } from '../../shared/config/db.js';

class TeamRepository {
  async findAll(limit, offset) {
    try {
      const selectTeamsQuery = `
        SELECT ${selectTeamDTO.join(', ')}
        FROM teams
        LIMIT $1 OFFSET $2
      `;

      const { rows } = await database.query(selectTeamsQuery, [limit, offset]);

      const total = await this.count();

      return [rows, total];
    } catch (error) {
      error.message = `TeamRepository.findAll: ${error.message}`;
      throw error;
    }
  }

  async findOne(id) {
    try {
      const selectTeamByIdQuery = `
        SELECT ${selectTeamDTO.join(', ')}
        FROM teams
        WHERE id = $1
      `;

      const { rows } = await database.query(selectTeamByIdQuery, [id]);
      return rows;
    } catch (error) {
      error.message = `TeamRepository.findOne: ${error.message}`;
      throw error;
    }
  }

  async create(teamDTO) {
    try {
      const createTeamQuery = `
            INSERT INTO teams (name) VALUES ($1) RETURNING id
        `;

      const { rows } = await database.query(createTeamQuery, [teamDTO.name]);

      return rows[0].id;
    } catch (error) {
      error.message = `UserRepository.findAll: ${error.message}`;
      throw error;
    }
  }

  async update(id) {}

  async delete(id) {
    try {
      const deleteTeamQuery = `
        DELETE FROM teams 
        WHERE id = $1
      `;

      const user = await database.query(deleteTeamQuery, [id]);

      return user;
    } catch (error) {
      error.message = `TeamRepository.delete: ${error.message}`;
      throw error;
    }
  }

  async count() {
    try {
      const teamsCountQuery = `
        SELECT count(*)
        FROM teams
      `;

      const { rows } = await database.query(teamsCountQuery);
      return rows[0].count;
    } catch (error) {
      error.message = `TeamRepository.count: ${error.message}`;
      throw error;
    }
  }
}

export { TeamRepository };
