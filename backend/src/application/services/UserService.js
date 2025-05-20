import { UserRepository } from '../../domain/repositories/UserRepository.js';
import { BadRequestError } from '../../shared/errors/BadRequestError.js';
import { ConflictError } from '../../shared/errors/ConflictError.js';
import { NotFoundError } from '../../shared/errors/NotFoundError.js';
import { hashPassword } from '../../shared/utils/hash.js';

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async findAll(limit, offset) {
    const [users, total] = await this.userRepository.findAll(limit, offset);

    return [users, total];
  }

  async findOne(id) {
    const user = await this.userRepository.findOne(id);

    if (user.length == 0) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

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

  async delete(id) {
    const user = await this.userRepository.delete(id);

    if (user.rowCount == 0) {
      throw new BadRequestError('User not found');
    }

    return;
  }
}

export { UserService };
