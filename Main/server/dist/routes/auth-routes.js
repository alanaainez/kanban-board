import express from 'express';
import { User } from '../models/user.js';
import { loginUser } from "../controllers/user-controller.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Missing username or password' });
        }
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
const router = express.Router();
// POST /login - Login a user
router.post('/login', loginUser);
export default router;
