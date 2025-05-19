import { UserRepository } from '../../domain/repositories/UserRepository.js';
import { ConflictError } from '../../shared/errors/ConflictError.js';
import { hashPassword } from '../../shared/utils/hash.js';

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async findAll() {}

  async findOne(id) {}

  async create(userDTO) {
    const emailExists = await this.userRepository.emailExists(userDTO.email);

    if (emailExists) {
      throw new ConflictError('Email is already in use');
    }

    const hashedPassword = await hashPassword(userDTO.password);

    const userWithHashedPassword = {
      ...userDTO,
      password: hashedPassword,
    };

    // TODO: check if team exists

    const user = await this.userRepository.create(userWithHashedPassword);
    return user;
  }

  async update(userDTO) {}

  async delete(id) {}
}

export { UserService };
