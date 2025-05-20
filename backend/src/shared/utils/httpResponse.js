import { z } from 'zod';

function successResponse(res, message, statusCode) {
  return res.status(statusCode).json({
    success: true,
    message,
  });
}

function successResponseWithData(res, data, message, statusCode) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

function successResponseWithDataAndMeta(res, data, message, meta, statusCode) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    meta,
  });
}

function errorResponse(res, message, errorMessage, statusCode, error) {
  if (error instanceof z.ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields',
      errors: error.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  return res.status(statusCode).json({
    success: false,
    message,
    error: errorMessage,
  });
}

export {
  errorResponse,
  successResponse,
  successResponseWithData,
  successResponseWithDataAndMeta,
};
