import express from "express";
import {
    addComment,
    getComments,
} from "../controllers/comment.controller.js";

import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, addComment);
router.get("/", getComments);

export default router;