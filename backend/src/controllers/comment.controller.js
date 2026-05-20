import prisma from "../lib/prisma.js";

export const addComment = async (req, res) => {
    try {
        const { content, postId } = req.body;

        const comment = await prisma.comment.create({
            data: {
                content,
                postId,
                authorId: req.user.id,
            },
        });

        res.json(comment);
    } catch (err) {
        console.error("COMMENT ERROR:", err);
        res.status(500).json({ error: err.message });
    }
};

export const getComments = async (req, res) => {
    const { postId } = req.query;

    const comments = await prisma.comment.findMany({
        where: { postId },
        include: { author: true },
        orderBy: { createdAt: "desc" },
    });

    res.json(comments);
};