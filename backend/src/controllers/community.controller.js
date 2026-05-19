import prisma from "../lib/prisma.js";

// POST /community
export const createCommunity = async (req, res) => {
    try {
        const { name, slug } = req.body;

        if (!name || !slug) {
            return res.status(400).json({ message: "Name and slug required" });
        }

        const existing = await prisma.community.findUnique({
            where: { name },
        });

        if (existing) {
            return res.status(400).json({ message: "Community exists" });
        }

        const community = await prisma.community.create({
            data: {
                name,
                slug,
            },
        });

        res.json(community);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET /community
export const getCommunities = async (req, res) => {
    try {
        const communities = await prisma.community.findMany();
        res.json(communities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getCommunityBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const community = await prisma.community.findUnique({
            where: { slug },
        });

        res.json(community);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
