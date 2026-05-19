import express from "express";
import {
    createPost,
    getPosts,
    getPostById,
    deletePost
} from "../controllers/post.controller.js";

import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.delete("/:id", authMiddleware, deletePost);

export default router;