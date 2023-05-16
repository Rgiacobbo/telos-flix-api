const mongoose = require("mongoose");

const { generateHash } = require("../utils/hashProvider");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['customer', 'admin']
    },
    age: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;

  user.password = await generateHash(user.password);

  console.log("Pre save hook");

  return next();
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  const doc = this;

  const userUpdated = doc.getUpdate();

  if (userUpdated.password) {
    userUpdated.password = await generateHash(userUpdated.password);
  }

  return next();
});

module.exports = mongoose.model("users", UserSchema);
