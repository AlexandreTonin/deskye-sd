import { createUserSchema } from '../validators/userValidator.js';
import {
  errorResponse,
  successResponse,
} from '../../shared/utils/httpResponse.js';
import { CreateUserDTO } from '../../application/dtos/user/CreateUserDTO.js';
import { UserService } from '../../application/services/UserService.js';

const userService = new UserService();

const UserController = {
  async create(req, res) {
    const createUserData = req.body;

    try {
      const validatedData = createUserSchema.parse(createUserData);

      const createUserDTO = new CreateUserDTO(validatedData);

      await userService.create(createUserDTO);

      successResponse(res, {}, 'User created successfully', {}, 201);
    } catch (error) {
      errorResponse(
        res,
        'Failed to create user',
        error.message,
        error.statusCode || 500,
        error,
      );
    }
  },

  async findAll(req, res) {},

  async findOne(req, res) {},

  async update(req, res) {},

  async delete(req, res) {},
};

export { UserController };
