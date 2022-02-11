class ApiError extends Error {
  public static UnauthorizedError() {
    return new ApiError(401, "User is not authorized");
  }

  public static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  public static NotFoundUserError() {
    return new ApiError(404, "User with this email was not found");
  }

  public status: number;
  public errors;

  public constructor(status: number, message: string, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

export default ApiError;
