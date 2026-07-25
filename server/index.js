import express from "express";

import cors from "cors";

import { config } from "./src/config/env.js";

import connectDB from "./src/config/db.js";

import authRoute from "./src/routes/authRoute.js";

connectDB();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRoute);

app.listen(config.port, (req, res) => {
  console.log(`Server running on port ${config.port}`);
});
