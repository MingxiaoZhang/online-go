import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { AuthRequest } from '../types/types';
import { Socket } from 'socket.io';
import { RedisClientConnection } from '../redis/types';
import { CONNECTED_IP_KEY } from '../const';
import redisClient from '../redis/redisClient';
import ip from 'ip';

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

export const userMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!req.ip) {
    return res.status(400).json({ error: 'Invalid connection' });
  }
  if (!authHeader) {
    console.log(req.ip);
    req.userId = ip.toLong(req.ip);
    next();
    return
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

export const socketMiddleware = async (socket: Socket, next: (err?: Error) => void) => {
  const token = socket.handshake.auth.token;
  const ip = socket.handshake.address;

  const isConnected = await redisClient.sIsMember(CONNECTED_IP_KEY, ip);
  if (isConnected) {
    return next(new Error('Connection from this IP address is already established'));
  }
  if (token) {
    try {
      const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
      socket.data.userId = payload.userId;
    } catch (error) {
      return next(new Error('Invalid token'));
    }
  } else {
    // Generate a temporary user ID based on IP address
    socket.data.userId = `temp-${ip}`;
  }
  next();
};
