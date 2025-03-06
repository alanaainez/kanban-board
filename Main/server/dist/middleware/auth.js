import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    //const authHeader = req.headers['authorization'];  
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next(); // Move to the next middleware
    }
    catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};
