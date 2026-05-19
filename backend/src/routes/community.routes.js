import express from "express";
import {
    createCommunity,
    getCommunities,
    getCommunityBySlug,
} from "../controllers/community.controller.js";

import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, createCommunity);
router.get("/", getCommunities);
router.get("/:slug", getCommunityBySlug);

export default router;