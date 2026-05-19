import express from "express";
import { votePost } from "../controllers/vote.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, votePost);

export default router;