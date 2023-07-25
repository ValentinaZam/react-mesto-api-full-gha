const jwt = require("jsonwebtoken");
const AuthError = require("../errors/AuthError");

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = () => {
  throw new AuthError("Необходима авторизация");
  // res.status(401).send({ message: "Необходима авторизация" });
};

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === "production" ? JWT_SECRET : "super-strong-secret");
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
};
