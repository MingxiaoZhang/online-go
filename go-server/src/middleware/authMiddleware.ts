import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { AuthRequest } from '../types/types';

const JWT_SECRET = process.env.JWT_SECRET || '';

interface JwtPayload {
  userId: number;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.userId = payload.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
