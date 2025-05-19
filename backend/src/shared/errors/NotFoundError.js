import { AppError } from './AppError.js';

class NotFoundError extends AppError {
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}

export { NotFoundError };
