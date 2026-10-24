import express from "express";

import cors from "cors";

import connectDB from "./src/config/db.js";

import authRoute from "./src/routes/authRoute.js";

import bankRoute from "./src/routes/bankRoute.js";

import userRoute from "./src/routes/userRoute.js";

connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: [
      "https://finora-66k1w3bfb-hunters-projects-fd8d2db7.vercel.app",
      "http://localhost:5173",
    ],
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

app.use("/api/profile", userRoute);

app.get("/", (req, res) => {
  res.send("Finora API is up and running!");
});
app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});
