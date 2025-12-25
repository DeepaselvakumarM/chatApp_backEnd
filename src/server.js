require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const errorHandler = require("./utils/errorHandler");
const app = express();
app.use(cors());
app.use(express.json());

// api routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use(errorHandler);

// connecting to localhost
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
