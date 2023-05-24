const CommentModel = require("../model/comment.model");

const invalidCommentRatting = {
  error: "@comments/create",
  message: "Error creating comment. The rating must be 1 to 5",
};

const list = async (request, response) => {
  try {
    const comments = await CommentModel.find()
      .populate({
        path: "user_id",
        select: "-password",
      })
      .populate("movie_id");

    return response.json(comments);
  } catch (err) {
    return response.status(400).json({
      error: "@comments/list",
      message: err.message || "Failed to list comments",
    });
  }
};
const listByMovieId = async (request, response) => {
  const { movie_id } = request.params;
  try {
    const comments = await CommentModel.find({ movie_id: movie_id }).populate({
      path: "user_id",
      select: "-password",
    });
    if (!comments) {
      throw new Error();
    }
    return response.json(comments);
  } catch (err) {
    return response.status(400).json({
      error: "@comments/listByMovieId",
      message: err.message || `Movie comments ${movie_id} not found`,
    });
  }
};

const getById = async (request, response) => {
  const { id } = request.params;

  try {
    const comment = await CommentModel.findById(id);

    if (!comment) {
      throw new Error();
    }
    return response.json(comment);
  } catch (err) {
    return response.status(400).json({
      error: "@comments/getById",
      message: err.message || `Comments not found ${id}`,
    });
  }
};

const create = async (request, response) => {
  const { movie_id, content, rating } = request.body;
  const userId = request.user._id;

  if (rating < 1 || rating > 5) {
    return response.status(400).json({ invalidCommentRatting });
  }

  try {
    const comment = await CommentModel.create({
      user_id: userId,
      movie_id,
      content,
      rating,
    });
    return response.status(201).json(comment);
  } catch (err) {
    return response.status(400).json({
      error: "@comments/create",
      message: err.message || "Failed to create a commment",
    });
  }
};

const update = async (request, response) => {
  const { id } = request.params;
  const { content, rating } = request.body;
  const userId = request.user._id;

  if (rating < 1 || rating > 5) {
    return response.status(400).json({ invalidCommentRatting });
  }
  try {
    const comment = await CommentModel.findById(id);

    if (
      userId !== comment.user_id.toString() &&
      request.user.role !== "admin"
    ) {
      return response.status(401).json({
        error: "@comment/update",
        message: "Not authorized",
      });
    }

    const commentUpdaded = await CommentModel.findByIdAndUpdate(
      id,
      {
        user_id: userId,
        movie_id: comment.movie_id,
        content,
        rating,
      },
      { new: true }
    );
    if (!commentUpdaded) {
      throw new Error();
    }
    return response.json(commentUpdaded);
  } catch (err) {
    return response.status(400).json({
      error: "@comments/update",
      message: err.message || `Comment not found ${id}`,
    });
  }
};

const remove = async (request, response) => {
  const { id } = request.params;
  try {
    const commentRemoved = await CommentModel.findByIdAndDelete(id);
    if (!commentRemoved) {
      throw new Error();
    }
    return response.status(204).send();
  } catch (err) {
    return response.status(400).json({
      error: "@comments/remove",
      message: err.message || `Comment not found ${id}`,
    });
  }
};

module.exports = {
  list,
  listByMovieId,
  getById,
  create,
  update,
  remove,
};
