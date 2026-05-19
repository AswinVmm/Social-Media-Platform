import prisma from "../lib/prisma.js";

export const votePost = async (req, res) => {
    const { postId, type } = req.body;
    const userId = req.user.userId;

    const existing = await prisma.vote.findFirst({
        where: { userId, postId },
    });

    if (existing) {
        await prisma.vote.delete({
            where: { id: existing.id },
        });
    }

    const vote = await prisma.vote.create({
        data: { type, userId, postId },
    });

    res.json(vote);
};