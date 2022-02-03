module.exports = class ApiError extends Error {
  status: number;
  errors;
  constructor(status: number, message: string, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, "User is not authorized");
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static NotFoundUserError() {
    return new ApiError(404, "User with this email was not found");
  }
};
