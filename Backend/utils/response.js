exports.successResponse = (res, statusCode, message, data = {}) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};

exports.errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    status: "fail",
    message,
  });
};
