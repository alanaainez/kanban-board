import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;
  const user = await User.findOne({
    username,
  });
  if (!user) return res.sendStatus(401);
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.sendStatus(401);
  const token = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET as string);
  res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
