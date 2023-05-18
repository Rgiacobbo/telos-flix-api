const { Router } = require("express");

const usersController = require("../controllers/users.controller");

const {
  authenticatedUsersRoles,
} = require("../middlewares/authenticatedUsersRoles");

const routes = Router();

routes.get("/users", usersController.list);

routes.post("/users", usersController.create);

routes.post("/users/admin", authenticatedUsersRoles, usersController.create);

routes.get("/users/:id", usersController.getById);

routes.put("/users/:id", usersController.update);

routes.delete("/users/:id", usersController.remove);

module.exports = routes;
