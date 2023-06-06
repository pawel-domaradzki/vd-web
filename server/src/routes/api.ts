import express from "express";

const router = express.Router();

import { search } from "../controllers/api";

router.get("/search", search);

export default router;
