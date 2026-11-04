import mongoose from "mongoose";

import { config } from "./env.js";

async function connectDB() {
  try {
    await mongoose.connect(config.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log("Successfully connected to database");
  } catch (err) {
    console.log("error connecting to database : ", err.message);
  }
}

export default connectDB;
