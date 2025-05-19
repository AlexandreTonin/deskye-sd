import { TeamDTO } from '../../application/dtos/team/TeamDTO.js';
import { TeamService } from '../../application/services/TeamService.js';
import {
  errorResponse,
  successResponse,
  successResponseWithData,
  successResponseWithDataAndMeta,
} from '../../shared/utils/httpResponse.js';
import { idParamSchema } from '../../shared/utils/isValidNumberReqParam.js';
import {
  getPaginationMeta,
  validatePagination,
} from '../../shared/utils/pagination.js';
import { createTeamSchema } from '../validators/teamValidator.js';

const teamService = new TeamService();

const TeamController = {
  async findAll(req, res) {
    const pagination = validatePagination(req.query.page, req.query.limit);

    try {
      const [teams, total] = await teamService.findAll(
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
        { teams },
        'Teams found successfully',
        paginationMeta,
        200,
      );
    } catch (error) {
      errorResponse(
        res,
        'Failed to found teams',
        error.message,
        error.statusCode || 500,
        error,
      );
    }
  },

  async findOne(req, res) {
    try {
      const { id } = idParamSchema.parse(req.params);
      const team = await teamService.findOne(id);

      successResponseWithData(res, { team }, 'Team found successfully', 200);
    } catch (error) {
      errorResponse(
        res,
        'Failed to found team',
        error.message,
        error.statusCode || 500,
        error,
      );
    }
  },

  async create(req, res) {
    try {
      const validatedData = createTeamSchema.parse(req.body);

      const teamDTO = new TeamDTO(validatedData);

      await teamService.create(teamDTO);

      successResponse(res, 'Team created successfully', 200);
    } catch (error) {
      errorResponse(
        res,
        'Failed to create team',
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
      await teamService.delete(id);

      successResponse(res, 'Team deleted successfully', 200);
    } catch (error) {
      errorResponse(
        res,
        'Failed to delete team',
        error.message,
        error.statusCode || 500,
        error,
      );
    }
  },
};

export { TeamController };
