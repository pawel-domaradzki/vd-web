"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserBookmarks = exports.updateBookmarks = exports.addMissingBookmarks = exports.getUser = void 0;
const User_js_1 = __importDefault(require("../models/User.js"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_js_1.default.findById(id);
        res.status(200).json(user);
    }
    catch (err) {
        const error = err;
        res.status(404).json({ message: error.message });
    }
});
exports.getUser = getUser;
const addMissingBookmarks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { bookmarks } = req.body;
    try {
        const user = yield User_js_1.default.findById(id);
        if (!user) {
            throw new Error("No user found with this id.");
        }
        user.bookmarks.push(...bookmarks);
        yield user.save();
        res.status(200).json({ message: "Missing bookmarks added successfully" });
    }
    catch (error) {
        console.error("Error adding missing bookmarks:", error);
        res.status(500).json({ error: "Error adding missing bookmarks" });
    }
});
exports.addMissingBookmarks = addMissingBookmarks;
const updateBookmarks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { bookmarks } = req.body;
    try {
        const user = yield User_js_1.default.findById(id);
        if (!user) {
            throw new Error("No user found with this id.");
        }
        user.bookmarks = bookmarks;
        yield user.save();
        res.status(200).json({ message: "Updated bookmarks successfully" });
    }
    catch (error) {
        console.error("Error adding missing bookmarks:", error);
        res.status(500).json({ error: "Error updating bookmarks" });
    }
});
exports.updateBookmarks = updateBookmarks;
const getUserBookmarks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_js_1.default.findById(id);
        if (!user) {
            throw new Error("No user found with this id.");
        }
        const bookmarks = user.bookmarks;
        res.status(200).json(bookmarks);
    }
    catch (err) {
        const error = err;
        res.status(404).json({ message: error.message });
    }
});
exports.getUserBookmarks = getUserBookmarks;
