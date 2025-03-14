import express from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

const router = express.Router();

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    console.log("Login attempt:", username, password ? "[password provided]" : "[no password]");
    
    if (!username || !password) {
      console.log("Missing username or password");
      return res.status(400).json({ message: 'Missing username or password' });
    }

    const user = await User.findOne({ where: { username } });
    console.log("User found:", user);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password);
    console.log("Password match:", match);

    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
    { username: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    return res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: 'Server error', error });
  }
};


// POST /login - Login a user
router.post('/login', login);

export default router;
