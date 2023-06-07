const UserModel = require("../model/user.model");

const list = async (request, response) => {
  try {
    const users = await UserModel.find({}, { password: 0 });

    return response.json(users);
  } catch (err) {
    return response.status(400).json({
      error: "users/list",
      message: "Failed to list users",
    });
  }
};

const getById = async (request, response) => {
  const { id } = request.params;

  try {
    const user = await UserModel.findById(id, { password: 0 });

    if (!user) {
      throw new Error();
    }

    return response.json(user);
  } catch (err) {
    return response.status(400).json({
      error: "@users/getById",
      message: err.message || `User not found ${id}`,
    });
  }
};

const create = async (request, response) => {
  const { name, email, password, birthDate, phone } = request.body;

  try {
    const user = await UserModel.create({
      name,
      email,
      password,
      role: "customer",
      birthDate,
      phone,
    });
    return response.status(201).json(user);
  } catch (err) {
    return response.status(400).json({
      error: "@users/create",
      message: err.message || "Failed to create user",
    });
  }
};

const createAdmin = async (request, response) => {
  const { name, email, password, birthDate, phone } = request.body;

  try {
    const user = await UserModel.create({
      name,
      email,
      password,
      role: "admin",
      birthDate,
      phone,
    });
    return response.status(201).json(user);
  } catch (err) {
    return response.status(400).json({
      error: "@users/create",
      message: err.message || "Failed to create user",
    });
  }
};

const update = async (request, response) => {
  const { id } = request.params;
  const { name, email, password, birthDate, phone } = request.body;

  try {
    const userUpdated = await UserModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password,
        birthDate,
        phone,
      },
      { new: true }
    );

    if (!userUpdated) {
      throw new Error();
    }

    return response.json(userUpdated);
  } catch (err) {
    return response.status(400).json({
      error: "@users/update",
      message: err.message || `User not found ${id}`,
    });
  }
};

const remove = async (request, response) => {
  const { id } = request.params;

  try {
    const userDeleted = await UserModel.findByIdAndDelete(id);

    if (!userDeleted) {
      throw new Error();
    }

    return response.status(204).send();
  } catch (err) {
    return response.status(400).json({
      error: "@users/remove",
      messaage: err.message || `User not found ${id}`,
    });
  }
};

module.exports = {
  list,
  getById,
  create,
  createAdmin,
  update,
  remove,
};
