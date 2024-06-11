import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/profile', authMiddleware, async (req, res) => {
  const userId = req.userId;
  // Fetch user profile logic here
  res.json({ message: `User ID: ${userId}` });
});

export default router;
