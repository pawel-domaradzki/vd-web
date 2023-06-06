import express from "express";

const router = express.Router();

import { search, videos } from "../controllers/api";

router.get("/search", search);
router.get("/videos", videos);

export default router;
