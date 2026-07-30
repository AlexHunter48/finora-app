import express from "express";

import cors from "cors";

import { config } from "./src/config/env.js";

import connectDB from "./src/config/db.js";

import authRoute from "./src/routes/authRoute.js";

import bankRoute from "./src/routes/bankRoute.js";
connectDB();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
});

app.use("/api/auth", authRoute);

app.use("/api/bank", bankRoute);

app.listen(config.port, (req, res) => {
  console.log(`Server running on port ${config.port}`);
});
