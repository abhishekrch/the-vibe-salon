import { Request, Response } from "express";
import { User } from "../models/user-model";
import { hashPassword } from "../utils/passwordUtils";

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
