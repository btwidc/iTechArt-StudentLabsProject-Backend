import jwt from "jsonwebtoken";

function authorizationCheck(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Not Authorized" });
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not Authorized" });
  }
}

export default authorizationCheck;
