const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/env");

const authenticatedUsersRoles = (request, response, next) => {
  const { authorization } = request.headers;

  const [prefix, token] = authorization.split(" ");

  const invalidTokenMessage = {
    error: "@authenticate/invalid-token",
    message: "The token provided for admin is invalid",
  };

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return response.status(401).json(invalidTokenMessage);
    }

    if (decoded.role !== "admin") {
      return response.status(401).json(invalidTokenMessage);
    }

    return next();
  });
};

module.exports = {
  authenticatedUsersRoles,
};
