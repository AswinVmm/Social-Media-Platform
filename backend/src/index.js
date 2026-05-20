import express from "express";
import cors from "cors";
// import dotenv from "dotenv/config";
import "dotenv/config";

import authRoutes from "./routes/auth.routes.js";
import communityRoutes from "./routes/community.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import voteRoutes from "./routes/vote.routes.js";
import commentRoutes from "./routes/comment.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/vote", voteRoutes);
app.use("/api/comment", commentRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});