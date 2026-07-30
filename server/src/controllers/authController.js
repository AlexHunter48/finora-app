import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

import userModel from "../models/userModel.js";
import { config } from "../config/env.js";
const client = new OAuth2Client(config.googleClientId);

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

export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    const googleRes = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const { name, email, picture } = await googleRes.json();

    let user = await userModel.findOne({ email });
    console.log(user);
    if (!user) {
      user = await userModel.create({
        name,
        email,
        avatar: picture,
        authProvider: "google",
        isVerified: true,
      });
    }

    if (user.authProvider == "local") {
      return res.status(400).json({
        message:
          "This email is registered with a password. Please sign in with your email and password.",
      });
    }

    const jwtToken = jwt.sign({ id: user._id }, config.JWT, {
      expiresIn: "1d",
    });

    res.status(200).json({
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Google authentication failed" });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!user.password || user.authProvider === "google") {
      return res.status(400).json({
        message:
          "This account was created using Google. Please sign in with Google.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

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
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
