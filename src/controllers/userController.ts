import ApiError from "../errors/ApiError";

class UserController {
  async registration(req, res) {}
  async login(req, res) {}
  async checkAuth(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.notFoundError("ID not set"));
    }
    res.json(id);
  }
}

const usersController = new UserController();
export default usersController;
