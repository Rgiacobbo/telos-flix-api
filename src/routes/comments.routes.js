const { Router } = require("express");

const commentsController = require("../controllers/comments.controller");

const { verifyAuthenticate } = require("../middlewares/verifyAuthentication");
const {
  authenticatedUsersRoles,
} = require("../middlewares/authenticatedUsersRoles");

const routes = Router();

routes.get("/comments", commentsController.list);

routes.get("/comments/movie/:movie_id", commentsController.listByMovieId);

routes.post("/comments", verifyAuthenticate, commentsController.create);

routes.get("/comments/:id", commentsController.getById);

routes.put("/comments/:id", verifyAuthenticate, commentsController.update);

routes.delete(
  "/comments/:id",
  verifyAuthenticate,
  authenticatedUsersRoles,
  commentsController.remove
);

module.exports = routes;
