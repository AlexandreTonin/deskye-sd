import { UserRepository } from "../repositories/UserRepository";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async findAll() {}

  async findOne(id) {}

  async create(userDTO) {}

  async update(userDTO) {}

  async delete(id) {}
}

export { UserService };
