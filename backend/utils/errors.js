const BAD_REQUEST_STATUS_CODE = 400;
const CONFLICT_STATUS_CODE = 409;
const CREATED_STATUS_CODE = 201;
const INTERNAL_SERVER_ERROR_STATUS_CODE = 500;
const UNAUTHORIZED_STATUS_CODE = 403;

function sendBadRequest(res, message = "Bad Request") {
  return res.status(BAD_REQUEST_STATUS_CODE).json({
    message,
  });
}

function sendConflict(res, message = "Conflict") {
  return res.status(CONFLICT_STATUS_CODE).json({
    message,
  });
}

function sendCreate(res, data = null, message = "Created") {
  return res.status(CREATED_STATUS_CODE).json({
    message,
    ...data,
  });
}

function sendInternalError(res, message = "Internal Server Error") {
  return res.status(INTERNAL_SERVER_ERROR_STATUS).json({
    message,
  });
}

function sendUnauthorized(res, message = "Unauthorized") {
    return res.status(UNAUTHORIZED_STATUS_CODE).json({
        message,
    });
}
