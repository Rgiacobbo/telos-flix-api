const authenticatedUsersRoles = (request, response, next) => {

  const invalidTokenMessage = {
    error: "@authenticate/invalid-token",
    message: "The token provided for admin is invalid",
  };

  if (request.user.role !== "admin") {
    return response.status(401).json(invalidTokenMessage);
  }

  return next();
};

module.exports = {
  authenticatedUsersRoles,
};
