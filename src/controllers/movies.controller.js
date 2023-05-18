const MovieModel = require("../model/movie.model");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

const list = async (request, response) => {
  try {
    const movies = await MovieModel.find();

    return response.json(movies);
  } catch (err) {
    return response.status(400).json({
      error: "@movies/list",
      message: err.message || "Failed to list movies",
    });
  }
};

const listGenres = async (request, response) => {
  try {
    const movies = await MovieModel.distinct("genres").sort();

    return response.json(movies);
  } catch (err) {
    return response.status(400).json({
      error: "@movies/listGenres",
      message: err.message || "Failed to list genres",
    });
  }
};

const getById = async (request, response) => {
  const { id } = request.params;
  const fields = {};

  if (!request.user) {
    fields.video = 0;
  }

  try {
    const movie = await MovieModel.findById(id, fields);

    if (!movie) {
      throw new Error();
    }
    return response.json(movie);
  } catch (err) {
    return response.status(400).json({
      error: "@movies/getById",
      message: err.message || `Movie not found ${id}`,
    });
  }
};

const create = async (request, response) => {
  const { title, description, year, genres, image, video } = request.body;

  try {
    const movie = await MovieModel.create({
      title,
      description,
      year,
      genres,
      image,
      video,
    });

    return response.status(201).json(movie);
  } catch (err) {
    return response.status(400).json({
      error: "@movies/create",
      message: err.message || "Failed to create a movie",
    });
  }
};

const update = async (request, response) => {
  const { id } = request.params;
  const { title, description, year, genres, image, video } = request.body;

  try {
    const movieUpdated = await MovieModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        year,
        genres,
        image,
        video,
      },
      {
        new: true,
      }
    );

    return response.json(movieUpdated);
  } catch (error) {
    return response.status(400).json({
      error: "@movies/update",
      message: `Movie not found ${id}`,
    });
  }
};

const remove = async (request, response) => {
  const { id } = request.params;

  try {
    const movieRemoved = await MovieModel.findByIdAndDelete(id);

    if (!movieRemoved) {
      throw new Error();
    }

    return response.status(204).send();
  } catch (err) {
    return response.status(400).json({
      error: "@movies/remove",
      message: err.message || `Movie not found ${id}`,
    });
  }
};

module.exports = {
  list,
  listGenres,
  getById,
  create,
  update,
  remove,
};
