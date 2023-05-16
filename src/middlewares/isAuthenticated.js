const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/env");

const isAuthenticated = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return next();
  }

  const [prefix, token] = authorization.split(" ");

  if (prefix !== "Bearer" && !token) {
    return next();
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      request.user = null;
    }

    request.user = decoded;
    return next();
  });
};

module.exports = {
  isAuthenticated,
};
