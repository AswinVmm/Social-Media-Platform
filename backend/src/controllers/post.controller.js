import prisma from "../lib/prisma.js";

export const createPost = async (req, res) => {
    try {
        const { title, content, imageUrl, link, communityId, postType, pollOptions } = req.body;

        const post = await prisma.post.create({
            data: {
                title,
                content: content || null,
                imageUrl: imageUrl || null,
                link: link || null,
                postType,
                pollOptions: pollOptions || null,
                communityId,
                authorId: req.user.id,
            },
        });

        res.json(post);
    } catch (err) {
        console.log("❌ CREATE POST ERROR:", err);
        res.status(500).json({ error: err.message });
    }
};

export const getPosts = async (req, res) => {
    const { sort, communityId } = req.query;

    let posts = await prisma.post.findMany({
        where: communityId ? { communityId } : {},
        include: {
            votes: true,
            comments: true,
            community: true,
            author: true,
        },
    });

    posts = posts.map(post => {
        const score =
            post.votes.filter(v => v.type === "UP").length -
            post.votes.filter(v => v.type === "DOWN").length;

        return { ...post, score };
    });

    // ✅ THEN SORT
    if (sort === "popular") {
        posts.sort((a, b) => b.score - a.score);
    } else {
        posts.sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        );
    }

    res.json(posts);
};

export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                votes: true,
                comments: true,
                community: true,
                author: true,
            },
        });

        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Step 1: Find post
        const post = await prisma.post.findUnique({
            where: { id },
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // ✅ Step 2: Check ownership
        if (post.authorId !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not allowed" });
        }

        // ✅ Step 3: Delete
        await prisma.post.delete({
            where: { id },
        });

        res.json({ message: "Post deleted successfully" });

    } catch (err) {
        console.log("❌ DELETE ERROR:", err);
        res.status(500).json({ error: err.message });
    }
};