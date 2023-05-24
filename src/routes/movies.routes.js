const { Router } = require("express");

const moviesController = require("../controllers/movies.controller");

const { verifyAuthenticate } = require("../middlewares/verifyAuthentication");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const {
  authenticatedUsersRoles,
} = require("../middlewares/authenticatedUsersRoles");

const routes = Router();

routes.get("/movies", isAuthenticated, moviesController.list);
routes.get("/movies/genres", moviesController.listGenres);
routes.get("/movies/:id", isAuthenticated, moviesController.getById);

routes.post(
  "/movies",
  verifyAuthenticate,
  authenticatedUsersRoles,
  moviesController.create
);

routes.put(
  "/movies/:id",
  verifyAuthenticate,
  authenticatedUsersRoles,
  moviesController.update
);

routes.delete(
  "/movies/:id",
  verifyAuthenticate,
  authenticatedUsersRoles,
  moviesController.remove
);

module.exports = routes;
