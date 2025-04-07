function successResponse(
  res,
  data,
  message = 'Success',
  meta = {},
  statusCode = 200,
) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    ...meta,
  });
}

function errorResponse(res, message = 'Error', errors = {}, statusCode = 400) {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
}

export { successResponse, errorResponse };
