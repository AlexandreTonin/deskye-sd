import { createUserSchema } from '../validators/userValidator.js';
import {
  errorResponse,
  successResponse,
  successResponseWithData,
  successResponseWithDataAndMeta,
} from '../../shared/utils/httpResponse.js';
import { CreateUserDTO } from '../../application/dtos/user/CreateUserDTO.js';
import { UserService } from '../../application/services/UserService.js';
import {
  getPaginationMeta,
  validatePagination,
} from '../../shared/utils/pagination.js';
import { idParamSchema } from '../../shared/utils/isValidNumberReqParam.js';

const userService = new UserService();

const UserController = {
  async create(req, res) {
    const createUserData = req.body;

    try {
      const validatedData = createUserSchema.parse(createUserData);

      const createUserDTO = new CreateUserDTO(validatedData);

      await userService.create(createUserDTO);

      successResponse(res, 'User created successfully', 201);
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

  async findAll(req, res) {
    const pagination = validatePagination(req.query.page, req.query.limit);

    try {
      const [users, total] = await userService.findAll(
        pagination.limit,
        pagination.offset,
      );

      const paginationMeta = getPaginationMeta(
        total,
        pagination.page,
        pagination.limit,
      );

      successResponseWithDataAndMeta(
        res,
        { users },
        'Users found successfully',
        paginationMeta,
        200,
      );
    } catch (error) {
      errorResponse(
        res,
        'Failed to found users',
        error.message,
        error.statusCode || 500,
        error,
      );
    }
  },

  async findOne(req, res) {
    try {
      const { id } = idParamSchema.parse(req.params);
      const user = await userService.findOne(id);

      successResponseWithData(res, { user }, 'User found successfully', 200);
    } catch (error) {
      errorResponse(
        res,
        'Failed to found user',
        error.message,
        error.statusCode || 500,
        error,
      );
    }
  },

  async update(req, res) {},

  async delete(req, res) {
    try {
      const { id } = idParamSchema.parse(req.params);
      await userService.delete(id);

      successResponse(res, 'User deleted successfully', 200);
    } catch (error) {
      errorResponse(
        res,
        'Failed to delete user',
        error.message,
        error.statusCode || 500,
        error,
      );
    }
  },
};

export { UserController };
