const apiError = require("../errors/ApiError");
const tokenService = require("../services/tokenService");

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(apiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(apiError.UnauthorizedError());
    }

    const decodedUserData = tokenService.validateAccessToken(accessToken);
    if (!decodedUserData) {
      return next(apiError.UnauthorizedError());
    }

    req.user = decodedUserData;
    next();
  } catch (e) {
    return next(apiError.UnauthorizedError());
  }
};
