function badRequest(res) {
  res.status(400).json({
    success: false,
    message: 'Bad Request',
    code: 400
  });
}

function customError(res, msg) {
  res.status(400).json({
    success: false,
    message: msg,
    code: 400
  });
}

function unauthorized(res) {
  res.status(401).json({
    success: false,
    message: 'Unauthorized',
    code: 401
  });
}

function forbidden(res) {
  res.status(403).json({
    success: false,
    message: 'Forbidden',
    code: 403
  });
}

function permissionError(res) {
  res.status(403).json({
    success: false,
    message: 'You do not have sufficient permissions to perform this action!',
    code: 403
  });
}

function notFound(res) {
  res.status(404).json({
    success: false,
    message: 'Resource not found',
    code: 404
  });
}

function notAcceptable(res) {
  res.status(406).json({
    success: false,
    message: 'Not Acceptable',
    code: 406
  });
}

function serverError(res) {
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    code: 500
  });
}

function success(res) {
  res.status(200).json({
    success: true,
    message: 'Operation Successful',
    code: 200
  });
}

function processing(res) {
  res.status(200).json({
    success: true,
    message: 'Request is being processed',
    code: 200
  });
}

export {
  badRequest,
  unauthorized,
  notFound,
  processing,
  serverError,
  success,
  notAcceptable,
  forbidden,
  customError,
  permissionError
};
