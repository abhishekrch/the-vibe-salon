import { Request, Response } from "express";
import { User } from "../models/user-model";
import { comparePassword, hashPassword } from "../utils/passwordUtils";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, phoneNumber, gender } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const passwordHash = await hashPassword(password);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
      phoneNumber,
      gender
    });

    await newUser.save();

    res.status(200).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed", error: error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      res.status(401).json({ message: "Invalid Credentials" });
    }

    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      console.error("JWT secret is not found");
      res.status(500).json({ message: "Server configuration error" });
      return;
    }

    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: "1h", // sets an expiration time inside the JWT itself
    });

    const options = {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, //automatically deletes the cookie after 1 hour
    };

    res
      .cookie("token", token, options)
      .status(200)
      .json({
        success: true,
        token, // Remove during Production
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        message: "User login success",
      });

  } catch (error) {
    console.error("Error during user login", error);
    res.status(500).json({ message: "Login failed", error: error });
  }
};
