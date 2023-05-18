const express = require("express");

require("./config/database");

const { PORT } = require("./config/env");

const userRoutes = require("./routes/users.routes");
const movieRoutes = require("./routes/movies.routes");
const authenticateRoutes = require("./routes/authenticate.routes");
const commentRoutes = require("./routes/comments.routes");

const app = express();

app.use(express.json());

app.use(userRoutes);
app.use(movieRoutes);
app.use(authenticateRoutes);
app.use(commentRoutes);

app.listen(PORT, () => {
  console.log(`API Running on port ${PORT}`);
});
