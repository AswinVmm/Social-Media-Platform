import prisma from "../lib/prisma.js";

export const addComment = async (req, res) => {
    const { content, postId } = req.body;

    const comment = await prisma.comment.create({
        data: {
            content,
            postId,
            authorId: req.user.userId,
        },
    });

    res.json(comment);
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