import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        console.log("BODY:", req.body);

        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ message: "Missing fields" });
        }

        // ✅ CHECK FIRST
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // ✅ THEN CREATE
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { email, username, password: hashedPassword },
        });

        res.json(user);
    } catch (err) {
        console.error("SIGNUP ERROR:", err);
        res.status(500).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};