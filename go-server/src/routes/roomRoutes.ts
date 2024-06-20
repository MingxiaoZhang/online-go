import { Router } from 'express';
import { createRoom, getRoomById, getRooms } from '../controllers/roomController';
import { authMiddleware, userMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/create', userMiddleware, createRoom);
router.get('/:id', userMiddleware, getRoomById);
router.get('/', userMiddleware, getRooms);

export default router;
