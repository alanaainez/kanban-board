import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from '../models/user.js';
//User Login
export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    console.log("Login attempt for:", username);
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            console.log("User not found");
            return res.status(401).json({ message: "Invalid username or password" });
        }
        console.log("User found, checking password...");
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password mismatch");
            return res.status(401).json({ message: "Invalid username or password" });
        }
        console.log("Login successful, generating token...");
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        console.log("Token generated for:", username);
        return res.json({ token, userId: user.id });
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Server error" });
    }
};
// GET /Users
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// GET /Users/:id
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// POST /Users
export const createUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = await User.create({ username, password });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// PUT /Users/:id
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
        const user = await User.findByPk(id);
        if (user) {
            user.username = username;
            user.password = password;
            await user.save();
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// DELETE /Users/:id
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            res.json({ message: 'User deleted' });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
