import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  //const authHeader = req.headers['authorization'];  
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
  return res.sendStatus(401);
  } 
  
  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
    
    req.user = user as JwtPayload; // Attach decoded user info to the request
    next(); // Move to the next middleware/route
  });
};
