const userService = require("../services/userService");

const { validationResult } = require("express-validator");
const ApiError = require("../errors/ApiError");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const { email, password, role } = req.body;
      const userData = await userService.registration(email, password, "HR");

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  // async logout(req, res, next) {
  //   try {
  //     const { refreshToken } = req.cookies;
  //     const token = await userService.logout(refreshToken);
  //     res.clearCookie("refreshToken");
  //     return res.json(token);
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

const usersController = new UserController();

export default usersController;
