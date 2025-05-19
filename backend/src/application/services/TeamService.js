import { TeamRepository } from '../../domain/repositories/TeamRepository.js';

class TeamService {
  constructor() {
    this.teamRepository = new TeamRepository();
  }

  async findAll(limit, offset) {
    const [teams, total] = await this.teamRepository.findAll(limit, offset);

    return [teams, total];
  }

  async findOne(id) {
    const team = await this.teamRepository.findOne(id);

    if (team.length == 0) {
      throw new NotFoundError('team not found');
    }

    return team;
  }

  async create(teamDTO) {
    // TODO: check if exist team with same name
    const team = await this.teamRepository.create(teamDTO);
    return team;
  }

  async update(id) {}

  async delete(id) {
    const user = await this.teamRepository.delete(id);

    if (user.rowCount == 0) {
      throw new BadRequestError('Team not found');
    }

    return;
  }
}

export { TeamService };
