import ApiError from "../errors/ApiError";

function ErrorHandling(err: ApiError, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Unexpected error";
  return res.status(status).json({ message: message });
}

export default ErrorHandling;
