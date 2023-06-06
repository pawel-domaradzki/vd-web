import User from "../models/User.js";
import { RouteHandler } from "../types/shared.js";

export const getUser: RouteHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    const error = err as Error;
    res.status(404).json({ message: error.message });
  }
};

export const addMissingBookmarks: RouteHandler = async (req, res) => {
  const { id } = req.params;
  const { bookmarks } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      throw new Error("No user found with this id.");
    }

    user.bookmarks.push(...bookmarks);

    await user.save();

    res.status(200).json({ message: "Missing bookmarks added successfully" });
  } catch (error) {
    console.error("Error adding missing bookmarks:", error);
    res.status(500).json({ error: "Error adding missing bookmarks" });
  }
};

export const updateBookmarks: RouteHandler = async (req, res) => {
  const { id } = req.params;
  const { bookmarks } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("No user found with this id.");
    }

    user.bookmarks = bookmarks;

    await user.save();

    res.status(200).json({ message: "Updated bookmarks successfully" });
  } catch (error) {
    console.error("Error adding missing bookmarks:", error);
    res.status(500).json({ error: "Error updating bookmarks" });
  }
};

export const getUserBookmarks: RouteHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      throw new Error("No user found with this id.");
    }

    const bookmarks = user.bookmarks;

    res.status(200).json(bookmarks);
  } catch (err) {
    const error = err as Error;
    res.status(404).json({ message: error.message });
  }
};
