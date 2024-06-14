import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { AuthRequest } from '../types/types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.get('/profile', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Fetch user profile from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true } // Only select the email field
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the user email
    res.json({ email: user.email });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/info', (req, res) => {
  const info = {
      name: 'My Application',
      version: '1.0.0',
      description: 'This is a sample application to demonstrate user registration and login using Express, TypeScript, and PostgreSQL.',
      author: 'Your Name'
  };

  res.json(info);
});

export default router;
