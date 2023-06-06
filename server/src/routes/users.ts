import express from "express";
import {
  getUser,
  getUserBookmarks,
  addMissingBookmarks,
  updateBookmarks,
} from "../controllers/users";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.get("/:id", getUser);
router.get("/:id/bookmarks", getUserBookmarks);
router.post("/:id/:bookmarks", verifyToken, addMissingBookmarks);
router.put("/:id/:bookmarks/update", verifyToken, updateBookmarks);

export default router;
