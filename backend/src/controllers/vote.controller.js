import prisma from "../lib/prisma.js";

export const votePost = async (req, res) => {
    const { postId, type } = req.body;
    const userId = req.user.userId;

    const existing = await prisma.vote.findFirst({
        where: { userId, postId },
    });

    // ✅ If same vote → remove (toggle off)
    if (existing && existing.type === type) {
        await prisma.vote.delete({
            where: { id: existing.id },
        });
    }
    // ✅ If different vote → update
    else if (existing) {
        await prisma.vote.update({
            where: { id: existing.id },
            data: { type },
        });
    }
    // ✅ If no vote → create
    else {
        await prisma.vote.create({
            data: { type, userId, postId },
        });
    }

    // ✅ RETURN UPDATED COUNT
    const votes = await prisma.vote.findMany({
        where: { postId },
    });

    const score =
        votes.filter(v => v.type === "UP").length -
        votes.filter(v => v.type === "DOWN").length;

    res.json({ score });
};