import ApiError from "../errors/ApiError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { User } = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign(
    {
      id,
      email,
      role,
    },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Incorrect email or password"));
    }
    const checkUser = await User.findOne({ where: { email } });
    if (checkUser) {
      return next(ApiError.badRequest("User with this email already exists"));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, password: hashPassword, role });
    const jwtToken = generateJwt(user.id, user.email, user.role);
    return res.json({ jwtToken });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.badRequest("User is not exists"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.badRequest("Incorrect password"));
    }
    const jwtToken = generateJwt(user.id, user.email, user.role);
    return res.json({ jwtToken });
  }

  async checkAuth(req, res, next) {}
}

const usersController = new UserController();
export default usersController;
