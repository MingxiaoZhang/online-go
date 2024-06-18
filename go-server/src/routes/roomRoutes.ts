import { Router } from 'express';
import { createRoom, getRooms } from '../controllers/roomController';

const router = Router();

router.post('/create', createRoom);
router.get('/', getRooms);

export default router;
