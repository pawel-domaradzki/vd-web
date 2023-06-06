import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { IUser, RouteHandler } from "../types/shared";

export const register: RouteHandler = async (req, res) => {
  try {
    const { displayName, email, password, bookmarks }: Partial<IUser> =
      req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password || "", salt);

    const newUser = new User({
      displayName,
      email,
      password: passwordHash,
      bookmarks,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const login: RouteHandler = async (req, res) => {
  try {
    const { email, password }: { email?: string; password?: string } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    const isMatch = await bcrypt.compare(password || "", user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "");
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(200).json({ token, user: userWithoutPassword });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};
