"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get("/:id", users_1.getUser);
router.get("/:id/bookmarks", users_1.getUserBookmarks);
router.post("/:id/:bookmarks", auth_1.verifyToken, users_1.addMissingBookmarks);
router.put("/:id/:bookmarks/update", auth_1.verifyToken, users_1.updateBookmarks);
exports.default = router;
