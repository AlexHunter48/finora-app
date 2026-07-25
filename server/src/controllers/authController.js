import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import userModel from "../models/userModel.js";
import { config } from "../config/env.js";

export const registerUser = async (req, res) => {
  try {
    const { name, password, email, monoAccountId } = req.body;
    if (!name || !password || !email)
      return res.status(400).json({ message: "All fields are required!" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must have atleast six characters!" });
    const userExists = await userModel.findOne({ email });
    if (userExists)
      return res
        .status(400)
        .json({ message: "User with this email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      name,
      password: hashedPassword,
      email,
      monoAccountId,
    });
    return res.status(200).json({
      message: "User created successfully",
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.log("Error creating user :", err.message);
    res.status(500).json({ message: "Error creating user" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });
    const user = await userModel.findOne({ email }).select("+password");
    if (!user)
      return res
        .status(400)
        .json({ message: "User does not exist, kindly sign-up" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
      },
      config.JWT,
      { expiresIn: "1d" },
    );
    res.status(200).json({
      message: "Logged in successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.log("Error logging in user:", err.message);
    res.status(500).json({ message: "Error logging in user" });
  }
};
