import { AppError } from './AppError.js';

class BadRequestError extends AppError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

export { BadRequestError };
